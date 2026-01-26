/**
 * The Thinking Machine That Doesn't Think
 * Interactive Paper Visualization
 *
 * @author Prayson Wilfred Daniel
 */

(function () {
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
      centerStrength: 0.15,
    },
    node: {
      minRadius: 8,
      maxRadius: 25,
      labelOffset: 8,
    },
    zoom: {
      min: 0.2,
      max: 4,
      step: 0.3,
    },
    animation: {
      duration: 300,
    },
    alive: {
      enabled: true,
      stanceForce: 0.03, // Gentle push toward stance position
      breathInterval: 1500, // Breath every 1.5 seconds
      breathStrength: 0.03, // Very subtle movement
    },
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
    searchMatches: [],
    searchIndex: 0,
    breathingPaused: false,
    dialogueVisible: true,
    dialogueInterval: null,
    currentSpeaker: null,
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

    // Start the dialogue system
    initDialogue();
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
        connectionCount: 0,
      };
      nodeMap.set(node.id, processed);
      return processed;
    });

    // Process links and count connections
    state.links = data.links
      .map((link) => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);

        if (source) source.connectionCount++;
        if (target) target.connectionCount++;

        return {
          ...link,
          source: link.source,
          target: link.target,
        };
      })
      .filter((link) => {
        // Only include links where both nodes exist
        return nodeMap.has(link.source) && nodeMap.has(link.target);
      });

    // Calculate node radius based on connections
    const maxConnections = Math.max(...state.nodes.map((n) => n.connectionCount));
    state.nodes.forEach((node) => {
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
    state.svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Add defs for gradients and filters
    const defs = state.svg.append('defs');

    // Glow filter
    const filter = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Arrow markers for directed edges (smaller, offset from node)
    ['supports', 'rebuts', 'extends'].forEach((type) => {
      defs
        .append('marker')
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
    state.zoom = d3
      .zoom()
      .scaleExtent([CONFIG.zoom.min, CONFIG.zoom.max])
      .on('zoom', (event) => {
        state.g.attr('transform', event.transform);
      });

    state.svg.call(state.zoom);

    // Create main group for transformations
    state.g = state.svg.append('g');

    // Center the view
    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8);

    state.svg.call(state.zoom.transform, initialTransform);
  }

  // ==========================================================================
  // Force Simulation
  // ==========================================================================

  function createSimulation() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;

    state.simulation = d3
      .forceSimulation(state.nodes)
      .force(
        'link',
        d3
          .forceLink(state.links)
          .id((d) => d.id)
          .distance(CONFIG.simulation.linkDistance)
      )
      .force('charge', d3.forceManyBody().strength(CONFIG.simulation.chargeStrength))
      .force('center', d3.forceCenter(0, 0).strength(CONFIG.simulation.centerStrength))
      .force(
        'collision',
        d3.forceCollide().radius((d) => d.radius + CONFIG.simulation.collisionRadius)
      )
      .force('stance', stanceForce()) // Push nodes by stance
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
    return function (alpha) {
      const strength = CONFIG.alive.stanceForce * alpha;

      state.nodes.forEach((node) => {
        // Supports (green) -> left, Challenges (red) -> right
        // Balanced (yellow) -> center
        if (node.stance === 'supports') {
          node.vx -= strength * 50; // Push left
        } else if (node.stance === 'challenges') {
          node.vx += strength * 50; // Push right
        }

        // Unconnected nodes: strong pull to center
        if (node.connectionCount === 0) {
          node.vx -= node.x * 0.1 * alpha;
          node.vy -= node.y * 0.1 * alpha;
        }
      });
    };
  }

  // Continuous gentle breathing animation - never stops
  function startBreathing() {
    setInterval(() => {
      // Skip if user is dragging a node
      if (state.breathingPaused) return;

      // Add small random velocity to each node
      state.nodes.forEach((node) => {
        if (!node.fx && !node.fy) {
          node.vx += (Math.random() - 0.5) * 0.8;
          node.vy += (Math.random() - 0.5) * 0.8;
        }
      });

      // Keep simulation alive with low alpha
      state.simulation.alpha(0.03).restart();
    }, CONFIG.alive.breathInterval);
  }

  // ==========================================================================
  // Create Visual Elements
  // ==========================================================================

  function createElements() {
    // Create links
    const linkGroup = state.g.append('g').attr('class', 'links');

    state.linkElements = linkGroup
      .selectAll('.link')
      .data(state.links)
      .join('line')
      .attr('class', (d) => `link ${d.type}`)
      .attr('marker-end', (d) => `url(#arrow-${d.type})`);

    // Create nodes
    const nodeGroup = state.g.append('g').attr('class', 'nodes');

    state.nodeElements = nodeGroup
      .selectAll('.node')
      .data(state.nodes)
      .join('g')
      .attr('class', (d) => `node ${d.stance}`)
      .call(drag(state.simulation));

    // Add circles to nodes
    state.nodeElements
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('filter', 'url(#glow)');

    // Add labels
    state.nodeElements
      .append('text')
      .attr('dy', (d) => d.radius + CONFIG.node.labelOffset)
      .attr('text-anchor', 'middle')
      .text((d) => d.shortTitle || d.title.substring(0, 20) + '...');

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
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    state.nodeElements.attr('transform', (d) => `translate(${d.x},${d.y})`);
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

    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
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

    // Start dialogues related to this node
    startDialogueForNode(d);
  }

  // ==========================================================================
  // Highlighting
  // ==========================================================================

  function highlightConnections(node) {
    // Find connected node IDs
    const connectedIds = new Set([node.id]);

    state.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;

      if (sourceId === node.id) connectedIds.add(targetId);
      if (targetId === node.id) connectedIds.add(sourceId);
    });

    // Update node styles
    state.nodeElements.classed('highlighted', (d) => connectedIds.has(d.id));
    state.nodeElements.classed('dimmed', (d) => !connectedIds.has(d.id));

    // Update link styles
    state.linkElements.classed('highlighted', (d) => {
      const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
      const targetId = typeof d.target === 'object' ? d.target.id : d.target;
      return sourceId === node.id || targetId === node.id;
    });
    state.linkElements.classed('dimmed', (d) => {
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
    evidenceList.innerHTML = d.keyEvidence.map((e) => `<li>${e}</li>`).join('');

    tooltip.querySelector('.connection-count').textContent = `${d.connectionCount} connections`;

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
    evidenceList.innerHTML = d.keyEvidence.map((e) => `<li>${e}</li>`).join('');

    // Connections
    const outgoingList = panel.querySelector('.outgoing-list');
    const incomingList = panel.querySelector('.incoming-list');

    const outgoing = [];
    const incoming = [];

    state.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;

      if (sourceId === d.id) {
        const targetNode = state.nodes.find((n) => n.id === targetId);
        if (targetNode) {
          outgoing.push({ node: targetNode, type: link.type, description: link.description });
        }
      }
      if (targetId === d.id) {
        const sourceNode = state.nodes.find((n) => n.id === sourceId);
        if (sourceNode) {
          incoming.push({ node: sourceNode, type: link.type, description: link.description });
        }
      }
    });

    outgoingList.innerHTML = outgoing.length
      ? outgoing
          .map(
            (c) => `
            <li data-id="${c.node.id}">
                <span class="connection-type ${c.type}">${c.type}</span>
                <span>${c.node.shortTitle || c.node.title}</span>
            </li>
        `
          )
          .join('')
      : '<li class="empty">No outgoing connections</li>';

    incomingList.innerHTML = incoming.length
      ? incoming
          .map(
            (c) => `
            <li data-id="${c.node.id}">
                <span class="connection-type ${c.type}">${c.type}</span>
                <span>${c.node.shortTitle || c.node.title}</span>
            </li>
        `
          )
          .join('')
      : '<li class="empty">No incoming connections</li>';

    // ArXiv link
    const arxivLink = panel.querySelector('.arxiv-link');
    arxivLink.href = `https://arxiv.org/abs/${d.id}`;

    // Add double-click handlers for connection items to jump to node
    panel.querySelectorAll('.connection-list li[data-id]').forEach((item) => {
      item.style.cursor = 'pointer';
      item.addEventListener('dblclick', () => {
        const nodeId = item.dataset.id;
        const node = state.nodes.find((n) => n.id === nodeId);
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

    const transform = d3.zoomIdentity.translate(width / 2 - node.x, height / 2 - node.y).scale(1.5);

    state.svg.transition().duration(750).call(state.zoom.transform, transform);
  }

  // ==========================================================================
  // Filtering
  // ==========================================================================

  function applyFilter(filter) {
    state.activeFilter = filter;

    if (filter === 'all') {
      // Clear all filter dimming
      state.nodeElements.classed('filter-dimmed', false).classed('filter-highlight', false);
      state.linkElements.classed('filter-dimmed', false);
    } else {
      // Highlight matching nodes, dim others
      state.nodeElements
        .classed('filter-dimmed', (d) => d.stance !== filter)
        .classed('filter-highlight', (d) => d.stance === filter);

      // Dim links not connected to highlighted nodes
      state.linkElements.classed('filter-dimmed', (d) => {
        const sourceNode = state.nodes.find(
          (n) => n.id === (typeof d.source === 'object' ? d.source.id : d.source)
        );
        const targetNode = state.nodes.find(
          (n) => n.id === (typeof d.target === 'object' ? d.target.id : d.target)
        );
        // Show link if at least one end is highlighted
        return sourceNode?.stance !== filter && targetNode?.stance !== filter;
      });
    }
  }

  function applyFilterPreview(filter) {
    if (filter === 'all') return;

    state.nodeElements
      .classed('filter-dimmed', (d) => d.stance !== filter)
      .classed('filter-highlight', (d) => d.stance === filter);

    state.linkElements.classed('filter-dimmed', (d) => {
      const sourceNode = state.nodes.find(
        (n) => n.id === (typeof d.source === 'object' ? d.source.id : d.source)
      );
      const targetNode = state.nodes.find(
        (n) => n.id === (typeof d.target === 'object' ? d.target.id : d.target)
      );
      return sourceNode?.stance !== filter && targetNode?.stance !== filter;
    });
  }

  function clearFilterPreview() {
    // Restore to current active filter state
    applyFilter(state.activeFilter);
  }

  // ==========================================================================
  // Search
  // ==========================================================================

  function applySearch(term) {
    state.searchTerm = term.toLowerCase();

    if (!term) {
      // Clear search state
      state.nodeElements
        .classed('dimmed', false)
        .classed('search-match', false)
        .classed('search-current', false);
      state.linkElements.classed('dimmed', false);
      state.searchMatches = [];
      state.searchIndex = 0;
      updateSearchIndicator();
      return;
    }

    // Find all matching nodes
    const matchingNodes = [];
    state.nodes.forEach((node) => {
      if (
        node.title.toLowerCase().includes(state.searchTerm) ||
        node.id.includes(state.searchTerm) ||
        node.coreArgument.toLowerCase().includes(state.searchTerm)
      ) {
        matchingNodes.push(node);
      }
    });

    const matchingIds = new Set(matchingNodes.map((n) => n.id));

    // Fade non-matching nodes
    state.nodeElements.classed('dimmed', (d) => !matchingIds.has(d.id));
    state.nodeElements.classed('search-match', (d) => matchingIds.has(d.id));

    // Fade non-matching links
    state.linkElements.classed('dimmed', (d) => {
      const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
      const targetId = typeof d.target === 'object' ? d.target.id : d.target;
      return !matchingIds.has(sourceId) && !matchingIds.has(targetId);
    });

    // Store matches for navigation
    state.searchMatches = matchingNodes;
    state.searchIndex = 0;

    // Jump to first match
    if (matchingNodes.length > 0) {
      jumpToSearchResult(0);
    }
  }

  function jumpToSearchResult(index) {
    if (!state.searchMatches || state.searchMatches.length === 0) return;

    // Wrap around
    if (index < 0) index = state.searchMatches.length - 1;
    if (index >= state.searchMatches.length) index = 0;

    state.searchIndex = index;
    const node = state.searchMatches[index];

    // Focus on the node
    focusOnNode(node);

    // Highlight it
    state.nodeElements.classed('search-current', (d) => d.id === node.id);

    // Update search result indicator
    updateSearchIndicator();
  }

  function nextSearchResult() {
    jumpToSearchResult(state.searchIndex + 1);
  }

  function prevSearchResult() {
    jumpToSearchResult(state.searchIndex - 1);
  }

  function updateSearchIndicator() {
    const indicator = document.getElementById('search-indicator');
    if (!indicator) return;

    if (state.searchMatches && state.searchMatches.length > 0) {
      indicator.textContent = `${state.searchIndex + 1}/${state.searchMatches.length}`;
      indicator.classList.add('visible');
    } else if (state.searchTerm) {
      indicator.textContent = '0/0';
      indicator.classList.add('visible');
    } else {
      indicator.classList.remove('visible');
    }
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
    state.svg
      .transition()
      .duration(CONFIG.animation.duration)
      .call(state.zoom.scaleBy, 1 + CONFIG.zoom.step);
  }

  function zoomOut() {
    state.svg
      .transition()
      .duration(CONFIG.animation.duration)
      .call(state.zoom.scaleBy, 1 - CONFIG.zoom.step);
  }

  function zoomReset() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8);

    state.svg
      .transition()
      .duration(CONFIG.animation.duration)
      .call(state.zoom.transform, transform);
  }

  // ==========================================================================
  // Stats
  // ==========================================================================

  function updateStats() {
    const total = window.paperData?.meta?.totalAnalyzed ?? state.nodes.length;
    const supports = state.nodes.filter((n) => n.stance === 'supports').length;
    const challenges = state.nodes.filter((n) => n.stance === 'challenges').length;
    const balanced = state.nodes.filter((n) => n.stance === 'balanced').length;

    document.getElementById('total-papers').textContent = total;
    document.getElementById('supports-count').textContent = supports;
    document.getElementById('challenges-count').textContent = challenges;
    document.getElementById('balanced-count').textContent = balanced;
  }

  // ==========================================================================
  // Dialogue System
  // ==========================================================================

  // Pre-built dialogues based on paper interactions
  const dialogues = [
    {
      sourceId: '2410.05229', // GSM-Symbolic
      targetId: '2501.12948', // DeepSeek-R1
      type: 'rebuts',
      message:
        "Your 'emergent reasoning' shows 65% accuracy drops with irrelevant info. That's pattern matching, not reasoning.",
    },
    {
      sourceId: '2501.12948', // DeepSeek-R1
      targetId: '2410.05229', // GSM-Symbolic
      type: 'rebuts',
      message:
        "We achieve 79.8% on AIME through pure RL. The 'Aha moment' emerges without human demos.",
    },
    {
      sourceId: '2305.18654', // Faith and Fate
      targetId: '2506.06941', // Illusion of Thinking
      type: 'supports',
      message:
        'Our exponential error propagation explains your complexity collapse. Same root cause.',
    },
    {
      sourceId: '2501.19393', // s1
      targetId: '2501.12948', // DeepSeek-R1
      type: 'supports',
      message:
        "Reasoning pre-exists in base models. Only 1K samples needed to surface it. RL amplifies, doesn't create.",
    },
    {
      sourceId: '2307.13702', // Measuring Faithfulness
      targetId: '2501.12948', // DeepSeek-R1
      type: 'rebuts',
      message:
        'Larger models = less faithful CoT. Your reasoning traces may be post-hoc rationalization.',
    },
    {
      sourceId: '2506.18880', // OMEGA
      targetId: '2501.12948', // DeepSeek-R1
      type: 'rebuts',
      message:
        'RL helps exploration but compositional generalization stays near-zero. 38% overthinking errors.',
    },
    {
      sourceId: '2512.07783', // Interplay
      targetId: '2501.19393', // s1
      type: 'supports',
      message:
        "Confirmed: 0% pretraining exposure = RL fails. The capability must exist as a 'seed' first.",
    },
    {
      sourceId: '2601.14456', // Planning Gap
      targetId: '2305.18654', // Faith and Fate
      type: 'extends',
      message:
        'Same pattern in planning: 82.9% in-domain to 0% out-of-domain. No genuine generalization.',
    },
    {
      sourceId: '2506.06941', // Illusion of Thinking
      targetId: '2501.12948', // DeepSeek-R1
      type: 'rebuts',
      message:
        'Complete accuracy collapse at 8-10 disks. Token usage DECREASES at failure. Not trying harder.',
    },
    {
      sourceId: '2601.00514', // Illusion of Insight
      targetId: '2501.12948', // DeepSeek-R1
      type: 'rebuts',
      message:
        "Your 'insights' don't transfer. We show zero-shot insight transfer fails systematically.",
    },
  ];

  let dialogueIndex = 0;

  function initDialogue() {
    const panel = document.getElementById('dialogue-panel');
    const showBtn = document.getElementById('dialogue-show-btn');
    if (!panel) return;

    // Position below thesis card
    positionDialoguePanel();

    // Double-click to hide
    panel.addEventListener('dblclick', hideDialogue);

    // Show button to reveal
    if (showBtn) {
      showBtn.addEventListener('click', showDialogue);
    }

    // Start dialogue cycle after delay
    setTimeout(() => {
      showNextDialogue();
      state.dialogueInterval = setInterval(showNextDialogue, 6000);
    }, 4000);
  }

  function positionDialoguePanel() {
    const thesisCard = document.getElementById('thesis-card');
    const thesisShowBtn = document.getElementById('thesis-show-btn');
    const panel = document.getElementById('dialogue-panel');
    const showBtn = document.getElementById('dialogue-show-btn');

    if (!panel) return;

    // On mobile, dialogue is at bottom - don't reposition
    if (window.innerWidth <= 768) return;

    let topPosition;

    // If thesis is collapsed, position below thesis show button or header
    if (thesisCard && thesisCard.classList.contains('collapsed')) {
      if (thesisShowBtn) {
        const btnRect = thesisShowBtn.getBoundingClientRect();
        topPosition = btnRect.bottom + 12;
      } else {
        topPosition = 180; // fallback
      }
    } else if (thesisCard) {
      const thesisRect = thesisCard.getBoundingClientRect();
      topPosition = thesisRect.bottom + 12; // 12px gap
    } else {
      topPosition = 180; // fallback
    }

    panel.style.top = `${topPosition}px`;
    if (showBtn) showBtn.style.top = `${topPosition}px`;
  }

  function hideDialogue() {
    const panel = document.getElementById('dialogue-panel');
    const showBtn = document.getElementById('dialogue-show-btn');
    state.dialogueVisible = false;
    panel.classList.add('hidden');
    if (showBtn) showBtn.classList.add('visible');
  }

  function showDialogue() {
    const panel = document.getElementById('dialogue-panel');
    const showBtn = document.getElementById('dialogue-show-btn');
    state.dialogueVisible = true;
    panel.classList.remove('hidden');
    if (showBtn) showBtn.classList.remove('visible');
  }

  function startDialogueForNode(node) {
    // Find all dialogues involving this node
    const relatedDialogues = dialogues.filter(
      (d) => d.sourceId === node.id || d.targetId === node.id
    );

    // Clear current messages
    const container = document.getElementById('dialogue-messages');
    if (container) container.innerHTML = '';

    // Show panel if hidden
    showDialogue();

    // Stop current interval
    if (state.dialogueInterval) {
      clearInterval(state.dialogueInterval);
    }

    // If no related dialogues, show a message and resume normal cycle
    if (relatedDialogues.length === 0) {
      const messageEl = document.createElement('div');
      messageEl.className = `dialogue-message ${node.stance}`;
      messageEl.innerHTML = `
                <span class="paper-name">${node.shortTitle || node.title}</span>
                <span class="message-text">${node.coreArgument}</span>
                <span class="message-type">core argument</span>
            `;
      container.appendChild(messageEl);
      highlightSpeaker(node);

      // Resume normal cycle after delay
      state.dialogueInterval = setInterval(showNextDialogue, 6000);
      return;
    }

    // Show related dialogues one by one
    let index = 0;
    const showRelated = () => {
      if (index < relatedDialogues.length) {
        const dialogue = relatedDialogues[index];
        const sourceNode = state.nodes.find((n) => n.id === dialogue.sourceId);
        if (sourceNode) {
          highlightSpeaker(sourceNode);
          addDialogueMessage(dialogue, sourceNode);
        }
        index++;
      } else {
        // After showing all related, return to normal cycle
        index = 0;
        dialogueIndex = dialogues.findIndex(
          (d) => d.sourceId === node.id || d.targetId === node.id
        );
        if (dialogueIndex === -1) dialogueIndex = 0;
      }
    };

    // Show first immediately, then continue
    showRelated();
    state.dialogueInterval = setInterval(() => {
      if (index < relatedDialogues.length) {
        showRelated();
      } else {
        showNextDialogue();
      }
    }, 4000);
  }

  function showNextDialogue() {
    if (!state.dialogueVisible) return;

    const dialogue = dialogues[dialogueIndex];
    const sourceNode = state.nodes.find((n) => n.id === dialogue.sourceId);

    if (!sourceNode) {
      dialogueIndex = (dialogueIndex + 1) % dialogues.length;
      return;
    }

    // Highlight speaking node
    highlightSpeaker(sourceNode);

    // Add message to panel
    addDialogueMessage(dialogue, sourceNode);

    // Move to next dialogue
    dialogueIndex = (dialogueIndex + 1) % dialogues.length;
  }

  function highlightSpeaker(node) {
    // Remove previous speaker highlight
    if (state.currentSpeaker) {
      state.nodeElements.filter((d) => d.id === state.currentSpeaker.id).classed('speaking', false);
    }

    // Add new speaker highlight
    state.nodeElements.filter((d) => d.id === node.id).classed('speaking', true);

    state.currentSpeaker = node;

    // Remove highlight after 4 seconds
    setTimeout(() => {
      state.nodeElements.filter((d) => d.id === node.id).classed('speaking', false);
    }, 4000);
  }

  function addDialogueMessage(dialogue, sourceNode) {
    const container = document.getElementById('dialogue-messages');
    if (!container) return;

    const messageEl = document.createElement('div');
    messageEl.className = `dialogue-message ${sourceNode.stance}`;
    messageEl.dataset.nodeId = sourceNode.id;

    messageEl.innerHTML = `
            <span class="paper-name">${sourceNode.shortTitle || sourceNode.title}</span>
            <span class="message-text">${dialogue.message}</span>
            <span class="message-type">${dialogue.type}</span>
        `;

    // Click to focus on node
    messageEl.addEventListener('click', () => {
      focusOnNode(sourceNode);
      highlightConnections(sourceNode);
    });

    // Add to bottom
    container.appendChild(messageEl);

    // Keep only last 5 messages
    while (container.children.length > 5) {
      container.removeChild(container.firstChild);
    }

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
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
      if (
        panel.classList.contains('open') &&
        !panel.contains(e.target) &&
        !e.target.closest('.node')
      ) {
        closeSidePanel();
      }
    });

    // Filter buttons
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        const isAllBtn = btn.dataset.filter === 'all';

        // Toggle: if clicking active non-all button, reset to all
        if (isActive && !isAllBtn) {
          document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          allBtn.classList.add('active');
          applyFilter('all');
        } else {
          document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          applyFilter(btn.dataset.filter);
        }
      });

      // Hover preview (only if not already active)
      btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('active')) {
          applyFilterPreview(btn.dataset.filter);
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
          clearFilterPreview();
        }
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

    // Search navigation with Enter/Shift+Enter
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          prevSearchResult();
        } else {
          nextSearchResult();
        }
      }
    });

    // Zoom controls
    document.getElementById('zoom-in').addEventListener('click', zoomIn);
    document.getElementById('zoom-out').addEventListener('click', zoomOut);
    document.getElementById('zoom-reset').addEventListener('click', zoomReset);

    // Thesis card toggle - double-click to hide
    const thesisCard = document.getElementById('thesis-card');
    if (thesisCard) {
      thesisCard.addEventListener('dblclick', () => {
        const thesisShowBtn = document.getElementById('thesis-show-btn');
        thesisCard.classList.add('collapsed');
        if (thesisShowBtn) thesisShowBtn.classList.add('visible');
        // Reposition dialogue panel
        setTimeout(positionDialoguePanel, 400);
      });
    }

    // Thesis show button
    const thesisShowBtn = document.getElementById('thesis-show-btn');
    if (thesisShowBtn) {
      thesisShowBtn.addEventListener('click', () => {
        const thesisCard = document.getElementById('thesis-card');
        thesisCard.classList.remove('collapsed');
        thesisShowBtn.classList.remove('visible');
        // Reposition dialogue panel
        setTimeout(positionDialoguePanel, 400);
      });
    }

    // Header toggle - main button
    const headerToggle = document.getElementById('header-toggle');
    if (headerToggle) {
      headerToggle.addEventListener('click', () => {
        document.querySelector('.header').classList.toggle('collapsed');
        // Reposition dialogue panel after transition
        setTimeout(positionDialoguePanel, 400);
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
        // Reposition dialogue panel after transition
        setTimeout(positionDialoguePanel, 400);
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
      searchInputCompact.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (e.shiftKey) {
            prevSearchResult();
          } else {
            nextSearchResult();
          }
        }
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
