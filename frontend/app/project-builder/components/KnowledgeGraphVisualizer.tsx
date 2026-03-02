'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  BackgroundVariant,
  Panel
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Network, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface KnowledgeGraphVisualizerProps {
  graphData: {
    nodes: Array<{
      id: string
      label: string
      type: string
      required?: boolean
    }>
    edges: Array<{
      source: string
      target: string
      reason: string
    }>
    warnings?: Array<any>
    conflicts?: Array<any>
  }
  selectedSystems?: string[]
  onNodeClick?: (nodeId: string) => void
}

// Custom node component
const CustomNode = ({ data }: any) => {
  const isAutoAdded = data.type === 'auto_added'
  const isSelected = data.type === 'selected'
  
  return (
    <div
      className={`px-6 py-4 rounded-lg border-2 shadow-lg transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-br from-[#C9A962]/5 to-[#A68B4B]/5 border-[#C9A962]'
          : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded ${
          isSelected ? 'bg-blue-100' : 'bg-orange-100'
        }`}>
          {isSelected ? (
            <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-[#C9A962]' : 'text-orange-600'}`} />
          ) : (
            <Zap className="w-5 h-5 text-orange-600" />
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white dark:text-white">{data.label}</div>
          <div className={`text-[10px] uppercase tracking-widest mt-1 ${
            isSelected ? 'text-[#C9A962]' : 'text-orange-600'
          }`}>
            {isSelected ? 'Selected' : 'Auto-Added'}
          </div>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode
}

export default function KnowledgeGraphVisualizer({
  graphData,
  selectedSystems = [],
  onNodeClick
}: KnowledgeGraphVisualizerProps) {
  // Convert backend graph data to ReactFlow format
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
      return { initialNodes: [], initialEdges: [] }
    }

    // Calculate layout positions (force-directed simulation)
    const nodes: Node[] = graphData.nodes.map((node, index) => {
      const isSelected = node.type === 'selected'
      const totalNodes = graphData.nodes.length
      const angle = (index / totalNodes) * 2 * Math.PI
      const radius = 250
      
      return {
        id: node.id,
        type: 'custom',
        position: {
          x: 400 + radius * Math.cos(angle),
          y: 300 + radius * Math.sin(angle)
        },
        data: {
          label: node.label,
          type: node.type,
          required: node.required
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left
      }
    })

    const edges: Edge[] = graphData.edges.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      label: '',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#3b82f6'
      },
      style: {
        stroke: '#3b82f6',
        strokeWidth: 2
      },
      labelStyle: {
        fontSize: 10,
        fill: '#6b7280'
      }
    }))

    return { initialNodes: nodes, initialEdges: edges }
  }, [graphData])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id)
      }
    },
    [onNodeClick]
  )

  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
        <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Dependency Graph Available
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Complete the intelligence analysis to view system dependencies
        </p>
      </div>
    )
  }

  const selectedCount = nodes.filter(n => n.data.type === 'selected').length
  const autoAddedCount = nodes.filter(n => n.data.type === 'auto_added').length
  const warningsCount = graphData.warnings?.length || 0

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C9A962]/5 to-[#A68B4B]/5 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              System Dependency Graph
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">
              Interactive visualization of system relationships and prerequisites
            </p>
          </div>
          <Network className="w-8 h-8 text-[#C9A962]" />
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C9A962]"></div>
            <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
              <span className="font-semibold">{selectedCount}</span> Selected Systems
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
              <span className="font-semibold">{autoAddedCount}</span> Auto-Added Dependencies
            </span>
          </div>
          {warningsCount > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                <span className="font-semibold">{warningsCount}</span> Warnings
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Graph Container */}
      <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClickHandler}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            color="#e5e7eb"
          />
          <Controls 
            showZoom={true}
            showFitView={true}
            showInteractive={false}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
          />
          
          {/* Legend Panel */}
          <Panel position="top-right" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
            <div className="text-xs font-medium text-gray-900 dark:text-white mb-3 uppercase tracking-widest">
              Legend
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#C9A962]"></div>
                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Your Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-600"></div>
                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Required Dependency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-[#C9A962]"></div>
                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Dependency Link</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-500">
              💡 Click and drag to pan<br />
              🔍 Use controls to zoom
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Warnings Section */}
      {warningsCount > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-orange-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Dependency Warnings ({warningsCount})
              </h4>
              <div className="space-y-2">
                {graphData.warnings?.slice(0, 3).map((warning: any, index: number) => (
                  <div key={index} className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded border border-orange-200">
                    <span className="font-medium text-orange-900">{warning.system}:</span> {warning.message}
                  </div>
                ))}
                {(graphData.warnings?.length || 0) > 3 && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                    + {(graphData.warnings?.length || 0) - 3} more warnings
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Read Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 p-6">
        <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-3 uppercase tracking-widest">
          How to Read This Graph
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 dark:text-gray-300 dark:text-gray-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C9A962] mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Blue nodes</span> represent systems you explicitly selected based on your project requirements
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Orange nodes</span> are automatically added as prerequisites for your selected systems
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-0.5 bg-[#C9A962] mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Arrows</span> show dependency relationships - systems at the arrow&apos;s origin require the target system
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Warnings</span> indicate potential constraints like space requirements or retrofit complexity
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
