'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Settings, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'
import {
  getProjectTypes,
  createProjectType,
  updateProjectType,
  deleteProjectType,
  getProjectCategories,
  createProjectCategory,
  updateProjectCategory,
  deleteProjectCategory
} from '@/lib/adminApi'

interface ProjectType {
  id: string
  name: string
  slug: string
  description?: string
  order: number
  is_active: boolean
}

interface ProjectCategory {
  id: string
  name: string
  slug: string
  description?: string
  order: number
  is_active: boolean
}

export default function ProjectSettingsPage() {
  const [types, setTypes] = useState<ProjectType[]>([])
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'types' | 'categories'>('types')
  
  // Modal states
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingType, setEditingType] = useState<ProjectType | null>(null)
  const [editingCategory, setEditingCategory] = useState<ProjectCategory | null>(null)
  
  // Form data
  const [typeForm, setTypeForm] = useState({ name: '', slug: '', description: '', order: 0, is_active: true })
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', order: 0, is_active: true })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [typesData, categoriesData] = await Promise.all([
        getProjectTypes(),
        getProjectCategories()
      ])
      setTypes(typesData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  // Type handlers
  const handleAddType = () => {
    setEditingType(null)
    setTypeForm({ name: '', slug: '', description: '', order: types.length, is_active: true })
    setShowTypeModal(true)
  }

  const handleEditType = (type: ProjectType) => {
    setEditingType(type)
    setTypeForm({
      name: type.name,
      slug: type.slug,
      description: type.description || '',
      order: type.order,
      is_active: type.is_active
    })
    setShowTypeModal(true)
  }

  const handleSaveType = async () => {
    try {
      if (!typeForm.name.trim()) {
        toast.error('Name is required')
        return
      }
      
      const data = {
        ...typeForm,
        slug: typeForm.slug || generateSlug(typeForm.name),
        id: editingType?.id || undefined
      }
      
      if (editingType) {
        await updateProjectType(editingType.id, data)
        toast.success('Type updated')
      } else {
        await createProjectType(data)
        toast.success('Type created')
      }
      
      setShowTypeModal(false)
      loadData()
    } catch (error) {
      toast.error('Failed to save type')
    }
  }

  const handleDeleteType = async (id: string) => {
    if (!confirm('Are you sure you want to delete this type?')) return
    try {
      await deleteProjectType(id)
      toast.success('Type deleted')
      loadData()
    } catch (error) {
      toast.error('Failed to delete type')
    }
  }

  // Category handlers
  const handleAddCategory = () => {
    setEditingCategory(null)
    setCategoryForm({ name: '', slug: '', description: '', order: categories.length, is_active: true })
    setShowCategoryModal(true)
  }

  const handleEditCategory = (category: ProjectCategory) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      order: category.order,
      is_active: category.is_active
    })
    setShowCategoryModal(true)
  }

  const handleSaveCategory = async () => {
    try {
      if (!categoryForm.name.trim()) {
        toast.error('Name is required')
        return
      }
      
      const data = {
        ...categoryForm,
        slug: categoryForm.slug || generateSlug(categoryForm.name),
        id: editingCategory?.id || undefined
      }
      
      if (editingCategory) {
        await updateProjectCategory(editingCategory.id, data)
        toast.success('Category updated')
      } else {
        await createProjectCategory(data)
        toast.success('Category created')
      }
      
      setShowCategoryModal(false)
      loadData()
    } catch (error) {
      toast.error('Failed to save category')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await deleteProjectCategory(id)
      toast.success('Category deleted')
      loadData()
    } catch (error) {
      toast.error('Failed to delete category')
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Settings</h1>
          <p className="text-gray-600 dark:text-zinc-400">Manage project types and categories</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'types'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Settings className="inline-block w-4 h-4 mr-2" />
          Project Types ({types.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'categories'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Layers className="inline-block w-4 h-4 mr-2" />
          Project Categories ({categories.length})
        </button>
      </div>

      {/* Types Tab */}
      {activeTab === 'types' && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Project Types</h2>
            <Button onClick={handleAddType} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Type
            </Button>
          </div>
          
          {types.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-zinc-500">
              No project types yet. Add your first type to get started.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {types.map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white">{type.name}</span>
                      {type.description && (
                        <p className="text-sm text-gray-500 dark:text-zinc-500">{type.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-zinc-400">{type.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        type.is_active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-500'
                      }`}>
                        {type.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleEditType(type)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button onClick={() => handleDeleteType(type.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Project Categories</h2>
            <Button onClick={handleAddCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
          
          {categories.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-zinc-500">
              No project categories yet. Add your first category to get started.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                      {category.description && (
                        <p className="text-sm text-gray-500 dark:text-zinc-500">{category.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-zinc-400">{category.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        category.is_active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-500'
                      }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleEditCategory(category)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Type Modal */}
      <Modal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        title={editingType ? 'Edit Project Type' : 'Add Project Type'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Name *</label>
            <Input
              value={typeForm.name}
              onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value, slug: generateSlug(e.target.value) })}
              placeholder="e.g., Residential"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Slug</label>
            <Input
              value={typeForm.slug}
              onChange={(e) => setTypeForm({ ...typeForm, slug: e.target.value })}
              placeholder="auto-generated-from-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Description</label>
            <Textarea
              value={typeForm.description}
              onChange={(e) => setTypeForm({ ...typeForm, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="type_active"
              checked={typeForm.is_active}
              onChange={(e) => setTypeForm({ ...typeForm, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="type_active" className="text-sm text-gray-700 dark:text-zinc-300">Active</label>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <Button onClick={handleSaveType} className="flex-1">
              {editingType ? 'Update Type' : 'Create Type'}
            </Button>
            <Button variant="outline" onClick={() => setShowTypeModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title={editingCategory ? 'Edit Project Category' : 'Add Project Category'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Name *</label>
            <Input
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value, slug: generateSlug(e.target.value) })}
              placeholder="e.g., Smart Villa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Slug</label>
            <Input
              value={categoryForm.slug}
              onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
              placeholder="auto-generated-from-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Description</label>
            <Textarea
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="category_active"
              checked={categoryForm.is_active}
              onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="category_active" className="text-sm text-gray-700 dark:text-zinc-300">Active</label>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <Button onClick={handleSaveCategory} className="flex-1">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
            <Button variant="outline" onClick={() => setShowCategoryModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
