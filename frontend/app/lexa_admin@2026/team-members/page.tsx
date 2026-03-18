'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, GripVertical, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, type TeamMember } from '@/lib/adminApi'
import { ImageUpload } from '@/components/admin/ImageUpload'
import Modal from '@/components/ui/Modal'
import SafeImage from '@/components/ui/SafeImage'

export default function TeamMembersAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    id: '',
    name: '',
    role: '',
    image: '',
    bio: '',
    linkedin: '',
    email: '',
    order: 0,
    is_active: true
  })

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const data = await getTeamMembers()
      setMembers(data || [])
    } catch (err) {
      console.error('Failed to load team members:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (member: TeamMember) => {
    setFormData({ ...member })
    setEditingId(member.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      role: '',
      image: '',
      bio: '',
      linkedin: '',
      email: '',
      order: members.length,
      is_active: true
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateTeamMember(editingId, formData as TeamMember)
      } else {
        await createTeamMember(formData as TeamMember)
      }
      await loadMembers()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save team member:', err)
      alert('Failed to save team member')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    setDeleting(id)
    try {
      await deleteTeamMember(id)
      await loadMembers()
    } catch (err) {
      console.error('Failed to delete team member:', err)
      alert('Failed to delete team member')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Team Members</h1>
          <p className="text-gray-600 dark:text-zinc-400">Manage team members displayed on the About page</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-charcoal hover:bg-charcoal-light text-white"
          data-testid="add-team-member-btn"
        >
          <Plus size={20} className="mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Members Grid */}
      {members.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-12 text-center">
          <p className="text-gray-500 dark:text-zinc-500 mb-4">No team members yet</p>
          <Button onClick={handleAdd} variant="outline">
            <Plus size={16} className="mr-2" />
            Add your first team member
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div 
              key={member.id} 
              className={`bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden group ${!member.is_active ? 'opacity-60' : ''}`}
              data-testid={`team-member-card-${member.id}`}
            >
              <div className="relative h-48 bg-gray-100 dark:bg-zinc-800">
                {member.image ? (
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
                {!member.is_active && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                    Inactive
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{member.role}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                    data-testid={`edit-team-member-${member.id}`}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(member.id)}
                    disabled={deleting === member.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    data-testid={`delete-team-member-${member.id}`}
                  >
                    {deleting === member.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Team Member' : 'Add Team Member'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Name *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-testid="team-member-name-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Role *</label>
            <Input
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Co-Founder, Project Manager"
              data-testid="team-member-role-input"
            />
          </div>

          <ImageUpload
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Profile Photo"
            category="team"
            showPreview={true}
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Bio</label>
            <Textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Short bio or description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">LinkedIn URL</label>
              <Input
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Email</label>
              <Input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Display Order</label>
              <Input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center pt-6">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: !!checked })}
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700 dark:text-zinc-300">
                Active (visible on website)
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="bg-charcoal hover:bg-charcoal-light text-white flex-1"
              disabled={saving}
              data-testid="save-team-member-btn"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingId ? 'Update Member' : 'Add Member'
              )}
            </Button>
            <Button 
              type="button"
              onClick={() => setShowForm(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
