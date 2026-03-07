'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getProjects, type Project } from '@/lib/api'
import { createProject, updateProject, deleteProject, getProjectTypes, getProjectCategories } from '@/lib/adminApi'
import { ImageUpload, MultiImageUpload } from '@/components/admin/ImageUpload'
import Modal from '@/components/ui/Modal'

interface ProjectTypeOption {
  id: string
  name: string
  slug: string
}

interface ProjectCategoryOption {
  id: string
  name: string
  slug: string
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectTypes, setProjectTypes] = useState<ProjectTypeOption[]>([])
  const [projectCategories, setProjectCategories] = useState<ProjectCategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    slug: '',
    title: '',
    location: '',
    type: '',
    year: '',
    image: '',
    systems: [],
    description: '',
    challenge: '',
    solution_details: '',
    outcome: '',
    client_testimonial: '',
    client_name: '',
    client_role: '',
    technical_specs: [],
    timeline: '',
    budget_range: '',
    team_size: undefined,
    gallery: [],
    video_url: '',
    features: [],
    results: [],
    category: ''
  })

  useEffect(() => {
    loadProjects()
    loadTypesAndCategories()
  }, [])

  const loadTypesAndCategories = async () => {
    try {
      const [types, categories] = await Promise.all([
        getProjectTypes(),
        getProjectCategories()
      ])
      setProjectTypes(types || [])
      setProjectCategories(categories || [])
    } catch (err) {
      console.error('Failed to load types/categories:', err)
    }
  }

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      // Ensure all projects have proper defaults and handle legacy field names
      const projectsWithDefaults = data.map((p: any) => ({
        ...p,
        slug: p.slug || p.id || '',
        title: p.title || '',
        location: p.location || '',
        type: p.type || p.category || '',
        year: p.year || new Date().getFullYear().toString(),
        image: p.image || p.thumbnail || '',
        systems: p.systems || [],
        description: p.description || '',
        challenge: p.challenge || '',
        solution_details: p.solution_details || '',
        outcome: p.outcome || '',
        client_testimonial: p.client_testimonial || '',
        client_name: p.client_name || '',
        client_role: p.client_role || '',
        technical_specs: p.technical_specs || [],
        timeline: p.timeline || '',
        budget_range: p.budget_range || '',
        team_size: p.team_size,
        // Handle both gallery and images field names
        gallery: p.gallery || p.images || [],
        video_url: p.video_url || '',
        features: p.features || [],
        results: p.results || [],
        category: p.category || ''
      }))
      setProjects(projectsWithDefaults)
    } catch (err) {
      console.error('Failed to load projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    // Handle legacy field names and ensure all fields have values
    const projectAny = project as any
    setFormData({
      ...project,
      slug: project.slug || projectAny.id || '',
      title: project.title || '',
      location: project.location || '',
      type: project.type || projectAny.category || '',
      year: project.year || new Date().getFullYear().toString(),
      image: project.image || projectAny.thumbnail || '',
      systems: project.systems || [],
      description: project.description || '',
      challenge: project.challenge || '',
      solution_details: project.solution_details || '',
      outcome: project.outcome || '',
      client_testimonial: project.client_testimonial || '',
      client_name: project.client_name || '',
      client_role: project.client_role || '',
      technical_specs: project.technical_specs || [],
      timeline: project.timeline || '',
      budget_range: project.budget_range || '',
      team_size: project.team_size,
      // Handle both gallery and images field names
      gallery: project.gallery || projectAny.images || [],
      video_url: projectAny.video_url || '',
      features: project.features || [],
      results: projectAny.results || [],
      category: projectAny.category || ''
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData({
      id: Date.now().toString(),
      slug: '',
      title: '',
      location: '',
      type: '',
      year: new Date().getFullYear().toString(),
      image: '',
      systems: [],
      description: '',
      challenge: '',
      solution_details: '',
      outcome: '',
      client_testimonial: '',
      client_name: '',
      client_role: '',
      technical_specs: [],
      timeline: '',
      budget_range: '',
      team_size: undefined,
      gallery: [],
      video_url: '',
      features: [],
      results: [],
      category: ''
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateProject(editingId, formData as Project)
      } else {
        await createProject(formData as Project)
      }
      await loadProjects()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save project:', err)
      alert('Failed to save project. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?')
    if (!confirmed) return
    
    setDeleting(id)
    try {
      console.log('Deleting project:', id)
      await deleteProject(id)
      console.log('Delete successful, refreshing list...')
      // Force refresh the projects list
      setProjects(prev => prev.filter(p => p.id !== id))
      // Also reload from server to ensure consistency
      await loadProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
      alert('Failed to delete project. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const handleArrayInput = (field: 'systems' | 'technical_specs' | 'gallery' | 'features' | 'results', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  if (loading) {
    return <div className="text-center py-20">Loading projects...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Projects</h1>
          <p className="text-gray-600">Manage project portfolio</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-charcoal hover:bg-charcoal-light text-white"
        >
          <Plus size={20} className="mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-gray-600">{project.systems.join(', ')}</div>
                </td>
                <td className="px-6 py-4 text-sm">{project.location}</td>
                <td className="px-6 py-4 text-sm">{project.type}</td>
                <td className="px-6 py-4 text-sm">{project.year}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    disabled={deleting === project.id}
                  >
                    <Edit size={16} className="inline" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    disabled={deleting === project.id}
                  >
                    {deleting === project.id ? (
                      <Loader2 size={16} className="inline animate-spin" />
                    ) : (
                      <Trash2 size={16} className="inline" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Project' : 'Add Project'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

              <div>
                <label className="block text-sm font-medium mb-1">Slug * (for URL)</label>
                <Input
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., luxury-villa-palm-jumeirah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location *</label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-12 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Type</option>
                    {projectTypes.map((type) => (
                      <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                    {/* Allow custom input if no types exist yet */}
                    {projectTypes.length === 0 && (
                      <>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Villa">Villa</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Year *</label>
                  <Input
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>

              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Main Project Image *"
                category="projects"
                showPreview={true}
              />

              <div>
                <label className="block text-sm font-medium mb-1">Systems (comma-separated)</label>
                <Input
                  value={formData.systems?.join(', ')}
                  onChange={(e) => handleArrayInput('systems', e.target.value)}
                  placeholder="e.g., Lighting, Security, Audio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-12 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Category</option>
                    {projectCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    {/* Allow custom input if no categories exist yet */}
                    {projectCategories.length === 0 && (
                      <>
                        <option value="Residential">Residential</option>
                        <option value="Smart Villa">Smart Villa</option>
                        <option value="Penthouse">Penthouse</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL</label>
                  <Input
                    value={formData.video_url || ''}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Features (comma-separated)</label>
                <Input
                  value={formData.features?.join(', ')}
                  onChange={(e) => handleArrayInput('features', e.target.value)}
                  placeholder="e.g., Voice Control, Automated Blinds, Multi-room Audio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Results / Metrics (comma-separated)</label>
                <Input
                  value={formData.results?.join(', ')}
                  onChange={(e) => handleArrayInput('results', e.target.value)}
                  placeholder="e.g., 30% energy savings, Seamless integration"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Case Study Details (Optional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Challenge</label>
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      placeholder="Describe the client's challenge or requirements"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Solution Details</label>
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                      value={formData.solution_details}
                      onChange={(e) => setFormData({ ...formData, solution_details: e.target.value })}
                      placeholder="How LEXA solved the challenge"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Outcome</label>
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                      value={formData.outcome}
                      onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                      placeholder="Results and benefits achieved"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Technical Specs (comma-separated)</label>
                    <Input
                      value={formData.technical_specs?.join(', ')}
                      onChange={(e) => handleArrayInput('technical_specs', e.target.value)}
                      placeholder="e.g., Crestron 3-Series, Lutron HomeWorks"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Timeline</label>
                      <Input
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        placeholder="e.g., 12 weeks"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Team Size</label>
                      <Input
                        type="number"
                        value={formData.team_size || ''}
                        onChange={(e) => setFormData({ ...formData, team_size: e.target.value ? parseInt(e.target.value) : undefined })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Client Testimonial</label>
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={3}
                      value={formData.client_testimonial}
                      onChange={(e) => setFormData({ ...formData, client_testimonial: e.target.value })}
                      placeholder="Quote from the client"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Client Name</label>
                      <Input
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Client Role</label>
                      <Input
                        value={formData.client_role}
                        onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                        placeholder="e.g., CEO, Homeowner"
                      />
                    </div>
                  </div>

                  <MultiImageUpload
                    values={formData.gallery || []}
                    onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                    label="Gallery Images"
                    category="projects"
                    maxImages={20}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="bg-charcoal hover:bg-charcoal-light text-white flex-1"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    `${editingId ? 'Update' : 'Create'} Project`
                  )}
                </Button>
                <Button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </form>
      </Modal>
    </div>
  )
}
