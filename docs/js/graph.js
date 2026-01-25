/**
 * The Thinking Machine That Doesn't Think
 * Interactive Paper Visualization
 * 
 * @author Prayson Wilfred Daniel
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================
    
    const CONFIG = {
        simulation: {
            chargeStrength: -150,
            linkDistance: 80,
            collisionRadius: 25,
            alphaDecay: 0.02,
            velocityDecay: 0.5,
            centerStrength: 0.15
        },
        node: {
            minRadius: 8,
            maxRadius: 25,
            labelOffset: 8
        },
        zoom: {
            min: 0.2,
            max: 4,
            step: 0.3
        },
        animation: {
            duration: 300
        },
        alive: {
            enabled: true,
            stanceForce: 0.03,      // Gentle push toward stance position
            breathInterval: 2000,   // Breath every 2 seconds
            breathStrength: 0.05,   // Visible but subtle movement
            idleTimeout: 5000       // Resume animation after 5 seconds idle
        }
    };

    // ==========================================================================
    // State
    // ==========================================================================
    
    let state = {
        nodes: [],
        links: [],
        simulation: null,
        svg: null,
        g: null,
        zoom: null,
        selectedNode: null,
        hoveredNode: null,
        activeFilter: 'all',
        searchTerm: '',
        isIdle: true,
        idleTimer: null,
        breathingPaused: false
    };

    // ==========================================================================
    // Initialization
    // ==========================================================================
    
    function init() {
        // Wait for data to be available
        if (typeof window.paperData === 'undefined') {
            setTimeout(init, 100);
            return;
        }

        processData();
        createSVG();
        createSimulation();
        createElements();
        setupEventListeners();
        updateStats();
        
        // Start with a nice entrance animation
        setTimeout(() => {
            state.simulation.alpha(1).restart();
        }, 100);
    }

    // ==========================================================================
    // Data Processing
    // ==========================================================================
    
    function processData() {
        const data = window.paperData;
        
        // Create node map for quick lookup
        const nodeMap = new Map();
        
        state.nodes = data.nodes.map((node, i) => {
            const processed = {
                ...node,
                id: node.id,
                index: i,
                connectionCount: 0
            };
            nodeMap.set(node.id, processed);
            return processed;
        });

        // Process links and count connections
        state.links = data.links.map(link => {
            const source = nodeMap.get(link.source);
            const target = nodeMap.get(link.target);
            
            if (source) source.connectionCount++;
            if (target) target.connectionCount++;
            
            return {
                ...link,
                source: link.source,
                target: link.target
            };
        }).filter(link => {
            // Only include links where both nodes exist
            return nodeMap.has(link.source) && nodeMap.has(link.target);
        });

        // Calculate node radius based on connections
        const maxConnections = Math.max(...state.nodes.map(n => n.connectionCount));
        state.nodes.forEach(node => {
            const ratio = node.connectionCount / maxConnections;
            node.radius = CONFIG.node.minRadius + (CONFIG.node.maxRadius - CONFIG.node.minRadius) * ratio;
            
            // Initialize nodes in a small random cluster so edges start connected
            node.x = (Math.random() - 0.5) * 100;
            node.y = (Math.random() - 0.5) * 100;
        });
    }

    // ==========================================================================
    // SVG Setup
    // ==========================================================================
    
    function createSVG() {
        const container = document.getElementById('graph');
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Clear any existing SVG
        d3.select('#graph svg').remove();

        // Create SVG
        state.svg = d3.select('#graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height]);

        // Add defs for gradients and filters
        const defs = state.svg.append('defs');

        // Glow filter
        const filter = defs.append('filter')
            .attr('id', 'glow')
            .attr('x', '-50%')
            .attr('y', '-50%')
            .attr('width', '200%')
            .attr('height', '200%');

        filter.append('feGaussianBlur')
            .attr('stdDeviation', '3')
            .attr('result', 'coloredBlur');

        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Arrow markers for directed edges (smaller, offset from node)
        ['supports', 'rebuts', 'extends'].forEach(type => {
            defs.append('marker')
                .attr('id', `arrow-${type}`)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 28)
                .attr('refY', 0)
                .attr('markerWidth', 4)
                .attr('markerHeight', 4)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('class', `arrow ${type}`);
        });

        // Create zoom behavior
        state.zoom = d3.zoom()
            .scaleExtent([CONFIG.zoom.min, CONFIG.zoom.max])
            .on('zoom', (event) => {
                state.g.attr('transform', event.transform);
            });

        state.svg.call(state.zoom);

        // Create main group for transformations
        state.g = state.svg.append('g');

        // Center the view
        const initialTransform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(0.8);
        
        state.svg.call(state.zoom.transform, initialTransform);
    }

    // ==========================================================================
    // Force Simulation
    // ==========================================================================
    
    function createSimulation() {
        const container = document.getElementById('graph');
        const width = container.clientWidth;
        const height = container.clientHeight;

        state.simulation = d3.forceSimulation(state.nodes)
            .force('link', d3.forceLink(state.links)
                .id(d => d.id)
                .distance(CONFIG.simulation.linkDistance))
            .force('charge', d3.forceManyBody()
                .strength(CONFIG.simulation.chargeStrength))
            .force('center', d3.forceCenter(0, 0).strength(CONFIG.simulation.centerStrength))
            .force('collision', d3.forceCollide()
                .radius(d => d.radius + CONFIG.simulation.collisionRadius))
            .force('stance', stanceForce())  // Push nodes by stance
            .alphaDecay(CONFIG.simulation.alphaDecay)
            .velocityDecay(CONFIG.simulation.velocityDecay)
            .on('tick', ticked);
        
        // Start the "alive" breathing animation
        if (CONFIG.alive.enabled) {
            startBreathing();
        }
    }
    
    // Custom force to push nodes by stance and keep unconnected nodes close
    function stanceForce() {
        return function(alpha) {
            const strength = CONFIG.alive.stanceForce * alpha;
            
            state.nodes.forEach(node => {
                // Supports (green) -> left, Challenges (red) -> right
                // Balanced (yellow) -> center
                if (node.stance === 'supports') {
                    node.vx -= strength * 50;  // Push left
                } else if (node.stance === 'challenges') {
                    node.vx += strength * 50;  // Push right
                }
                
                // Unconnected nodes: strong pull to center
                if (node.connectionCount === 0) {
                    node.vx -= node.x * 0.1 * alpha;
                    node.vy -= node.y * 0.1 * alpha;
                }
            });
        };
    }
    
    // Gentle breathing animation
    function startBreathing() {
        setInterval(() => {
            // Only breathe when idle
            if (!state.isIdle || state.breathingPaused) return;
            
            // Add small random velocity to each node
            state.nodes.forEach(node => {
                if (!node.fx && !node.fy) {  // Not being dragged
                    node.vx += (Math.random() - 0.5) * 1.5;
                    node.vy += (Math.random() - 0.5) * 1.5;
                }
            });
            // Reheat simulation - higher alpha so it runs longer
            state.simulation.alpha(0.1).restart();
        }, CONFIG.alive.breathInterval);
        
        // Track user activity
        ['click', 'mousedown', 'mousemove', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer);
        });
        
        // Start idle
        resetIdleTimer();
    }
    
    function resetIdleTimer() {
        state.isIdle = false;
        
        if (state.idleTimer) {
            clearTimeout(state.idleTimer);
        }
        
        state.idleTimer = setTimeout(() => {
            state.isIdle = true;
        }, CONFIG.alive.idleTimeout);
    }

    // ==========================================================================
    // Create Visual Elements
    // ==========================================================================
    
    function createElements() {
        // Create links
        const linkGroup = state.g.append('g').attr('class', 'links');
        
        state.linkElements = linkGroup.selectAll('.link')
            .data(state.links)
            .join('line')
            .attr('class', d => `link ${d.type}`)
            .attr('marker-end', d => `url(#arrow-${d.type})`);

        // Create nodes
        const nodeGroup = state.g.append('g').attr('class', 'nodes');
        
        state.nodeElements = nodeGroup.selectAll('.node')
            .data(state.nodes)
            .join('g')
            .attr('class', d => `node ${d.stance}`)
            .call(drag(state.simulation));

        // Add circles to nodes
        state.nodeElements.append('circle')
            .attr('r', d => d.radius)
            .attr('filter', 'url(#glow)');

        // Add labels
        state.nodeElements.append('text')
            .attr('dy', d => d.radius + CONFIG.node.labelOffset)
            .attr('text-anchor', 'middle')
            .text(d => d.shortTitle || d.title.substring(0, 20) + '...');

        // Node interactions
        state.nodeElements
            .on('mouseenter', handleNodeHover)
            .on('mouseleave', handleNodeLeave)
            .on('click', handleNodeClick);
    }

    // ==========================================================================
    // Simulation Tick
    // ==========================================================================
    
    function ticked() {
        state.linkElements
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        state.nodeElements
            .attr('transform', d => `translate(${d.x},${d.y})`);
    }

    // ==========================================================================
    // Drag Behavior
    // ==========================================================================
    
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }

    // ==========================================================================
    // Node Interactions
    // ==========================================================================
    
    function handleNodeHover(event, d) {
        state.hoveredNode = d;
        
        // Highlight connected nodes and links
        highlightConnections(d);
        
        // Show tooltip
        showTooltip(event, d);
    }

    function handleNodeLeave() {
        state.hoveredNode = null;
        
        // Remove highlights
        clearHighlights();
        
        // Hide tooltip
        hideTooltip();
    }

    function handleNodeClick(event, d) {
        event.stopPropagation();
        state.selectedNode = d;
        
        // Open side panel
        openSidePanel(d);
    }

    // ==========================================================================
    // Highlighting
    // ==========================================================================
    
    function highlightConnections(node) {
        // Find connected node IDs
        const connectedIds = new Set([node.id]);
        
        state.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (sourceId === node.id) connectedIds.add(targetId);
            if (targetId === node.id) connectedIds.add(sourceId);
        });

        // Update node styles
        state.nodeElements.classed('highlighted', d => connectedIds.has(d.id));
        state.nodeElements.classed('dimmed', d => !connectedIds.has(d.id));

        // Update link styles
        state.linkElements.classed('highlighted', d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return sourceId === node.id || targetId === node.id;
        });
        state.linkElements.classed('dimmed', d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return sourceId !== node.id && targetId !== node.id;
        });
    }

    function clearHighlights() {
        state.nodeElements.classed('highlighted', false).classed('dimmed', false);
        state.linkElements.classed('highlighted', false).classed('dimmed', false);
    }

    // ==========================================================================
    // Tooltip
    // ==========================================================================
    
    function showTooltip(event, d) {
        const tooltip = document.getElementById('tooltip');
        
        // Populate content
        tooltip.querySelector('.tooltip-title').textContent = d.title;
        tooltip.querySelector('.tooltip-arxiv').textContent = d.id;
        
        const stanceBadge = tooltip.querySelector('.tooltip-stance');
        stanceBadge.textContent = d.stance;
        stanceBadge.className = `tooltip-stance ${d.stance}`;
        
        tooltip.querySelector('.tooltip-argument').textContent = `"${d.coreArgument}"`;
        
        const evidenceList = tooltip.querySelector('.evidence-list');
        evidenceList.innerHTML = d.keyEvidence
            .map(e => `<li>${e}</li>`)
            .join('');
        
        tooltip.querySelector('.connection-count').textContent = 
            `${d.connectionCount} connections`;

        // Position tooltip
        const padding = 20;
        let x = event.pageX + padding;
        let y = event.pageY + padding;

        // Keep tooltip in viewport
        const rect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (x + 320 > viewportWidth) {
            x = event.pageX - 320 - padding;
        }
        if (y + rect.height > viewportHeight) {
            y = viewportHeight - rect.height - padding;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.classList.add('visible');
    }

    function hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('visible');
    }

    // ==========================================================================
    // Side Panel
    // ==========================================================================
    
    function openSidePanel(d) {
        const panel = document.getElementById('side-panel');
        
        // Populate header
        const stanceBadge = panel.querySelector('.panel-stance-badge');
        stanceBadge.textContent = d.stance;
        stanceBadge.className = `panel-stance-badge ${d.stance}`;
        
        panel.querySelector('.panel-title').textContent = d.title;
        panel.querySelector('.panel-arxiv').textContent = d.id;
        panel.querySelector('.panel-date').textContent = d.date;

        // Core argument
        panel.querySelector('.panel-argument').textContent = d.coreArgument;

        // Evidence
        const evidenceList = panel.querySelector('.panel-evidence');
        evidenceList.innerHTML = d.keyEvidence
            .map(e => `<li>${e}</li>`)
            .join('');

        // Connections
        const outgoingList = panel.querySelector('.outgoing-list');
        const incomingList = panel.querySelector('.incoming-list');
        
        const outgoing = [];
        const incoming = [];
        
        state.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (sourceId === d.id) {
                const targetNode = state.nodes.find(n => n.id === targetId);
                if (targetNode) {
                    outgoing.push({ node: targetNode, type: link.type, description: link.description });
                }
            }
            if (targetId === d.id) {
                const sourceNode = state.nodes.find(n => n.id === sourceId);
                if (sourceNode) {
                    incoming.push({ node: sourceNode, type: link.type, description: link.description });
                }
            }
        });

        outgoingList.innerHTML = outgoing.length ? outgoing.map(c => `
            <li data-id="${c.node.id}">
                <span class="connection-type ${c.type}">${c.type}</span>
                <span>${c.node.shortTitle || c.node.title}</span>
            </li>
        `).join('') : '<li class="empty">No outgoing connections</li>';

        incomingList.innerHTML = incoming.length ? incoming.map(c => `
            <li data-id="${c.node.id}">
                <span class="connection-type ${c.type}">${c.type}</span>
                <span>${c.node.shortTitle || c.node.title}</span>
            </li>
        `).join('') : '<li class="empty">No incoming connections</li>';

        // ArXiv link
        const arxivLink = panel.querySelector('.arxiv-link');
        arxivLink.href = `https://arxiv.org/abs/${d.id}`;

        // Add double-click handlers for connection items to jump to node
        panel.querySelectorAll('.connection-list li[data-id]').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('dblclick', () => {
                const nodeId = item.dataset.id;
                const node = state.nodes.find(n => n.id === nodeId);
                if (node) {
                    focusOnNode(node);
                    highlightConnections(node);
                    openSidePanel(node);
                }
            });
        });

        // Open panel
        panel.classList.add('open');
    }

    function closeSidePanel() {
        const panel = document.getElementById('side-panel');
        panel.classList.remove('open');
        state.selectedNode = null;
    }

    function focusOnNode(node) {
        const container = document.getElementById('graph');
        const width = container.clientWidth;
        const height = container.clientHeight;

        const transform = d3.zoomIdentity
            .translate(width / 2 - node.x, height / 2 - node.y)
            .scale(1.5);

        state.svg.transition()
            .duration(750)
            .call(state.zoom.transform, transform);
    }

    // ==========================================================================
    // Filtering
    // ==========================================================================
    
    function applyFilter(filter) {
        state.activeFilter = filter;

        state.nodeElements.style('display', d => {
            if (filter === 'all') return 'block';
            return d.stance === filter ? 'block' : 'none';
        });

        state.linkElements.style('display', d => {
            if (filter === 'all') return 'block';
            const sourceNode = state.nodes.find(n => n.id === (typeof d.source === 'object' ? d.source.id : d.source));
            const targetNode = state.nodes.find(n => n.id === (typeof d.target === 'object' ? d.target.id : d.target));
            return (sourceNode?.stance === filter || targetNode?.stance === filter) ? 'block' : 'none';
        });

        // Reheat simulation
        state.simulation.alpha(0.3).restart();
    }

    // ==========================================================================
    // Search
    // ==========================================================================
    
    function applySearch(term) {
        state.searchTerm = term.toLowerCase();

        if (!term) {
            state.nodeElements.classed('dimmed', false);
            state.linkElements.classed('dimmed', false);
            return;
        }

        const matchingIds = new Set();
        state.nodes.forEach(node => {
            if (node.title.toLowerCase().includes(state.searchTerm) ||
                node.id.includes(state.searchTerm) ||
                node.coreArgument.toLowerCase().includes(state.searchTerm)) {
                matchingIds.add(node.id);
            }
        });

        state.nodeElements.classed('dimmed', d => !matchingIds.has(d.id));
        state.nodeElements.classed('highlighted', d => matchingIds.has(d.id));

        state.linkElements.classed('dimmed', d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return !matchingIds.has(sourceId) && !matchingIds.has(targetId);
        });
    }

    // ==========================================================================
    // Theme Toggle
    // ==========================================================================
    
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    }

    // ==========================================================================
    // Zoom Controls
    // ==========================================================================
    
    function zoomIn() {
        state.svg.transition()
            .duration(CONFIG.animation.duration)
            .call(state.zoom.scaleBy, 1 + CONFIG.zoom.step);
    }

    function zoomOut() {
        state.svg.transition()
            .duration(CONFIG.animation.duration)
            .call(state.zoom.scaleBy, 1 - CONFIG.zoom.step);
    }

    function zoomReset() {
        const container = document.getElementById('graph');
        const width = container.clientWidth;
        const height = container.clientHeight;

        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(0.8);

        state.svg.transition()
            .duration(CONFIG.animation.duration)
            .call(state.zoom.transform, transform);
    }

    // ==========================================================================
    // Stats
    // ==========================================================================
    
    function updateStats() {
        const total = state.nodes.length;
        const supports = state.nodes.filter(n => n.stance === 'supports').length;
        const challenges = state.nodes.filter(n => n.stance === 'challenges').length;
        const balanced = state.nodes.filter(n => n.stance === 'balanced').length;

        document.getElementById('total-papers').textContent = total;
        document.getElementById('supports-count').textContent = supports;
        document.getElementById('challenges-count').textContent = challenges;
        document.getElementById('balanced-count').textContent = balanced;
    }

    // ==========================================================================
    // Event Listeners
    // ==========================================================================
    
    function setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
        initTheme();

        // Close panel
        document.getElementById('close-panel').addEventListener('click', closeSidePanel);

        // Click outside to close panel
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('side-panel');
            if (panel.classList.contains('open') && 
                !panel.contains(e.target) && 
                !e.target.closest('.node')) {
                closeSidePanel();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.dataset.filter);
            });
        });

        // Search
        const searchInput = document.getElementById('search-input');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applySearch(e.target.value);
            }, 200);
        });

        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', zoomIn);
        document.getElementById('zoom-out').addEventListener('click', zoomOut);
        document.getElementById('zoom-reset').addEventListener('click', zoomReset);

        // Thesis card toggle
        document.getElementById('thesis-toggle').addEventListener('click', () => {
            document.getElementById('thesis-card').classList.toggle('collapsed');
        });

        // Header toggle - main button
        const headerToggle = document.getElementById('header-toggle');
        if (headerToggle) {
            headerToggle.addEventListener('click', () => {
                document.querySelector('.header').classList.toggle('collapsed');
            });
        }
        
        // Double-click on header to collapse
        const header = document.querySelector('.header');
        if (header) {
            header.addEventListener('dblclick', (e) => {
                // Don't collapse if clicking on interactive elements
                if (e.target.closest('input, button, .filter-btn')) return;
                header.classList.add('collapsed');
            });
        }
        
        // Click on compact bar to expand (except search)
        const headerCompact = document.querySelector('.header-compact');
        if (headerCompact) {
            headerCompact.addEventListener('click', (e) => {
                if (e.target.closest('.search-container-compact')) return;
                document.querySelector('.header').classList.remove('collapsed');
            });
        }

        // Sync compact search with main search
        const searchInputCompact = document.getElementById('search-input-compact');
        if (searchInputCompact) {
            searchInputCompact.addEventListener('input', (e) => {
                searchInput.value = e.target.value;
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    applySearch(e.target.value);
                }, 200);
            });
            searchInput.addEventListener('input', () => {
                searchInputCompact.value = searchInput.value;
            });
        }

        // Start collapsed on mobile
        if (window.innerWidth <= 768) {
            document.querySelector('.header').classList.add('collapsed');
        }

        // Window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createSVG();
                createElements();
            }, 250);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidePanel();
                clearHighlights();
                hideTooltip();
            }
            if (e.key === '/' && !e.target.matches('input')) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // ==========================================================================
    // Start
    // ==========================================================================
    
    document.addEventListener('DOMContentLoaded', init);

})();
