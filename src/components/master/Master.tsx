import React, { useState } from 'react';
import {
  MapPin,
  Building,
  Globe,
  Flag,
  Users,
  Plus,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

interface MasterItem {
  id: number;
  name: string;
  code?: string;
  description?: string;
  status?: 'Active' | 'Inactive';
  createdAt?: string;
  updatedAt?: string;
}

interface TabData {
  id: string;
  name: string;
  icon: React.ElementType;
  data: MasterItem[];
}

const Master: React.FC = () => {
  const [activeTab, setActiveTab] = useState('designation');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MasterItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  // Sample data for each tab
  const [tabsData, setTabsData] = useState<TabData[]>([
    {
      id: 'designation',
      name: 'Designation',
      icon: Users,
      data: [
        { id: 1, name: 'Medical Representative', code: 'MR001', description: 'Sales representative for medical products', status: 'Active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
        { id: 2, name: 'Area Sales Manager', code: 'ASM001', description: 'Manager for area sales operations', status: 'Active', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
        { id: 3, name: 'Regional Manager', code: 'RM001', description: 'Manager for regional operations', status: 'Active', createdAt: '2024-01-17', updatedAt: '2024-01-17' }
      ]
    },
    {
      id: 'country',
      name: 'Country',
      icon: Globe,
      data: [
        { id: 1, name: 'India', code: 'IN', description: 'Republic of India', status: 'Active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
        { id: 2, name: 'United States', code: 'US', description: 'United States of America', status: 'Active', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
        { id: 3, name: 'United Kingdom', code: 'UK', description: 'United Kingdom', status: 'Active', createdAt: '2024-01-17', updatedAt: '2024-01-17' }
      ]
    },
    {
      id: 'zone',
      name: 'Zone',
      icon: MapPin,
      data: [
        { id: 1, name: 'North Zone', code: 'NZ001', description: 'Northern region operations zone', status: 'Active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
        { id: 2, name: 'South Zone', code: 'SZ001', description: 'Southern region operations zone', status: 'Active', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
        { id: 3, name: 'East Zone', code: 'EZ001', description: 'Eastern region operations zone', status: 'Active', createdAt: '2024-01-17', updatedAt: '2024-01-17' }
      ]
    },
    {
      id: 'headquarters',
      name: 'Head Quarter',
      icon: Building,
      data: [
        { id: 1, name: 'Delhi HQ', code: 'DHQ001', description: 'Delhi headquarters office', status: 'Active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
        { id: 2, name: 'Mumbai HQ', code: 'MHQ001', description: 'Mumbai headquarters office', status: 'Active', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
        { id: 3, name: 'Bangalore HQ', code: 'BHQ001', description: 'Bangalore headquarters office', status: 'Active', createdAt: '2024-01-17', updatedAt: '2024-01-17' }
      ]
    },
    {
      id: 'location',
      name: 'Location',
      icon: Flag,
      data: [
        { id: 1, name: 'Connaught Place', code: 'CP001', description: 'Central Delhi business district', status: 'Active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
        { id: 2, name: 'Andheri West', code: 'AW001', description: 'Mumbai business hub', status: 'Active', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
        { id: 3, name: 'Koramangala', code: 'KR001', description: 'Bangalore tech district', status: 'Active', createdAt: '2024-01-17', updatedAt: '2024-01-17' }
      ]
    }
  ]);

  const currentTabData = tabsData.find(tab => tab.id === activeTab);
  const CurrentIcon = currentTabData?.icon || Users;
  const filteredData = currentTabData?.data || [];

  const handleAdd = () => {
    setFormData({ name: '', code: '', description: '', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: MasterItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      code: item.code || '',
      description: item.description || '',
      status: item.status || 'Active'
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setTabsData(prev => prev.map(tab =>
        tab.id === activeTab
          ? { ...tab, data: tab.data.filter(item => item.id !== id) }
          : tab
      ));
    }
  };

  const handleSaveAdd = () => {
    const newItem: MasterItem = {
      id: Date.now(),
      name: formData.name,
      code: formData.code,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setTabsData(prev => prev.map(tab =>
      tab.id === activeTab
        ? { ...tab, data: [...tab.data, newItem] }
        : tab
    ));

    setIsAddModalOpen(false);
    setFormData({ name: '', code: '', description: '', status: 'Active' });
  };

  const handleSaveEdit = () => {
    if (!selectedItem) return;

    const updatedItem: MasterItem = {
      ...selectedItem,
      name: formData.name,
      code: formData.code,
      description: formData.description,
      status: formData.status,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setTabsData(prev => prev.map(tab =>
      tab.id === activeTab
        ? { ...tab, data: tab.data.map(item => item.id === selectedItem.id ? updatedItem : item) }
        : tab
    ));

    setIsEditModalOpen(false);
    setSelectedItem(null);
    setFormData({ name: '', code: '', description: '', status: 'Active' });
  };

  const Modal = ({ isOpen, onClose, title, children }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Master Data Management</h1>
            <p className="text-blue-600 mt-1">Manage all master data entities for your organization</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {currentTabData?.name}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Master Data List */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CurrentIcon className="w-5 h-5 text-blue-600" />
              {currentTabData?.name} ({filteredData.length})
            </h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Code</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <CurrentIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border">
                          {item.code || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-500 break-words">
                          {item.description || '-'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-sm border ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500">{item.updatedAt}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <CurrentIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No {currentTabData?.name.toLowerCase()} found</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title={`Add New ${currentTabData?.name}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} name`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} code`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} description`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAdd}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {currentTabData?.name}
              </button>
            </div>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${currentTabData?.name}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} name`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} code`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${currentTabData?.name.toLowerCase()} description`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update {currentTabData?.name}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Master;
