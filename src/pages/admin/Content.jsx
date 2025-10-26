import React, { useState, useEffect, Fragment } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import API from '../../services/api';
import { Edit, Trash2, ChevronUp, Plus, X, Search } from 'lucide-react';

// --- FAQ Item Component using Headless UI Disclosure ---
const FaqItem = ({ faq, onEdit, onDelete }) => {
  return (
    <Disclosure as="div" className="border-b">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between items-center p-4 text-left font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
            <span>{faq.question}</span>
            <div className="flex items-center gap-3 shrink-0">
              <button className="p-1 text-gray-400 hover:text-green-600" onClick={(e) => { e.stopPropagation(); onEdit(faq); }}><Edit className="w-4 h-4" /></button>
              <button className="p-1 text-gray-400 hover:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete(faq.id); }}><Trash2 className="w-4 h-4" /></button>
              <ChevronUp className={`w-5 h-5 transition-transform ${open ? 'rotate-180 transform' : ''}`} />
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pb-4 pt-2 text-gray-600 bg-gray-50">
              {faq.answer}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

// --- Tip Item Component ---
const TipItem = ({ tip, onEdit, onDelete }) => (
  <div className="p-4 border rounded-lg bg-white mb-3">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-800">{tip.title}</h4>
        <p className="text-gray-600 text-sm mt-1">{tip.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button className="p-1 text-gray-400 hover:text-green-600" onClick={() => onEdit(tip)}><Edit className="w-4 h-4" /></button>
        <button className="p-1 text-gray-400 hover:text-red-600" onClick={() => onDelete(tip.id)}><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  </div>
);


// --- Add/Edit Modal (Generic for FAQ and Tip) ---
const ContentModal = ({ isOpen, onClose, item, type, onSave }) => {
  const [formData, setFormData] = useState({ title: '', description: '', question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      if (type === 'faq') setFormData({ question: item.question, answer: item.answer });
      if (type === 'tip') setFormData({ title: item.title, description: item.description });
    } else {
      // Reset form when adding new
      setFormData({ title: '', description: '', question: '', answer: '' });
    }
  }, [item, type, isOpen]); // Reset form when modal opens or item changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSave(item ? item.id : null, formData);
      onClose(); // Close on success
    } catch (err) {
      setError(err.response?.data?.error || `Failed to save ${type}`);
    }
    setLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { onClose(); setError(''); }}>
        {/* ... Backdrop ... */}
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
           <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
             {/* ... Panel ... */}
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {item ? `Edit ${type === 'faq' ? 'FAQ' : 'Tip'}` : `Add New ${type === 'faq' ? 'FAQ' : 'Tip'}`}
                </Dialog.Title>
                 <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                  {type === 'faq' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium">Question</label>
                        <input type="text" name="question" value={formData.question} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Answer</label>
                        <textarea name="answer" rows="4" value={formData.answer} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                      </div>
                    </>
                  ) : ( // type === 'tip'
                    <>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                      </div>
                    </>
                  )}
                  <div className="pt-4 flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 mr-2 border rounded-lg text-gray-700 hover:bg-gray-100">Cancel</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 disabled:bg-gray-400">
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Main Page Component ---
const Content = () => {
  const [faqs, setFaqs] = useState([]);
  const [tips, setTips] = useState([]);
  const [aboutContent, setAboutContent] = useState({ mission: '', vision: '' });
  const [loading, setLoading] = useState({ faqs: true, tips: true, about: true });
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('faq'); // 'faq' or 'tip'
  const [currentItem, setCurrentItem] = useState(null); // Item to edit
  const [saveStatus, setSaveStatus] = useState(''); // For 'About' save button

  // Fetch all content on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, faqs: true, tips: true, about: true }));
        const [faqsRes, tipsRes, aboutRes] = await Promise.all([
          API.get('/admin/faqs'),
          API.get('/admin/tips'),
          API.get('/admin/about')
        ]);
        setFaqs(faqsRes.data.faqs);
        setTips(tipsRes.data.tips);
        setAboutContent(aboutRes.data);
      } catch (err) {
        setError("Failed to load content.");
        console.error(err);
      } finally {
        setLoading({ faqs: false, tips: false, about: false });
      }
    };
    fetchData();
  }, []);

  // --- CRUD Handlers ---
  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSaveFaq = async (id, data) => {
    if (id) { // Update existing
      await API.put(`/admin/faqs/${id}`, data);
    } else { // Add new
      await API.post('/admin/faqs', data);
    }
    // Refresh FAQ list
    const res = await API.get('/admin/faqs');
    setFaqs(res.data.faqs);
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await API.delete(`/admin/faqs/${id}`);
      setFaqs(faqs.filter(f => f.id !== id)); // Update UI immediately
    } catch (err) { alert("Failed to delete FAQ"); }
  };

  const handleSaveTip = async (id, data) => {
    if (id) { // Update existing
      await API.put(`/admin/tips/${id}`, data);
    } else { // Add new
      await API.post('/admin/tips', data);
    }
    // Refresh Tip list
    const res = await API.get('/admin/tips');
    setTips(res.data.tips);
  };

   const handleDeleteTip = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Tip?")) return;
    try {
      await API.delete(`/admin/tips/${id}`);
      setTips(tips.filter(t => t.id !== id)); // Update UI immediately
    } catch (err) { alert("Failed to delete Tip"); }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    try {
      await API.put('/admin/about', aboutContent);
      setSaveStatus('Content saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000); // Clear status after 3s
    } catch (err) {
      setSaveStatus('Failed to save content.');
      console.error(err);
    }
  };

  return (
    <>
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        type={modalType}
        onSave={modalType === 'faq' ? handleSaveFaq : handleSaveTip}
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Content Management</h1>
        <p className="text-gray-600 mb-8">Edit FAQs, the About Page, and sustainability tips.</p>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl">
          <input type="text" placeholder="Search content..." className="w-full p-3 pl-10 bg-white rounded-lg border border-gray-200" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* FAQs Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">FAQs</h2>
              <button onClick={() => handleOpenModal('faq')} className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm shadow hover:bg-yellow-600">
                <Plus className="w-4 h-4" /> Add New FAQ
              </button>
            </div>
            {loading.faqs ? <p>Loading FAQs...</p> : (
              <div className="border rounded-lg overflow-hidden bg-white">
                {faqs.length === 0 ? <p className="p-4 text-center text-gray-500">No FAQs added yet.</p> :
                  faqs.map(faq => <FaqItem key={faq.id} faq={faq} onEdit={handleOpenModal.bind(null, 'faq')} onDelete={handleDeleteFaq} />)
                }
              </div>
            )}
          </div>

          {/* Sustainability Tips Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sustainability Tips</h2>
              <button onClick={() => handleOpenModal('tip')} className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm shadow hover:bg-yellow-600">
                <Plus className="w-4 h-4" /> Add New Tip
              </button>
            </div>
             {loading.tips ? <p>Loading Tips...</p> : (
               <div className="space-y-3">
                 {tips.length === 0 ? <p className="p-4 text-center text-gray-500 bg-white rounded-lg">No Tips added yet.</p> :
                   tips.map(tip => <TipItem key={tip.id} tip={tip} onEdit={handleOpenModal.bind(null, 'tip')} onDelete={handleDeleteTip} />)
                 }
               </div>
             )}
          </div>
        </div>

        {/* About Page Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">About Page</h2>
          {loading.about ? <p>Loading About content...</p> : (
            <form onSubmit={handleSaveAbout}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
                  <textarea rows="4" className="w-full p-2 border rounded-md" value={aboutContent.mission || ''} onChange={(e) => setAboutContent(prev => ({ ...prev, mission: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
                  <textarea rows="4" className="w-full p-2 border rounded-md" value={aboutContent.vision || ''} onChange={(e) => setAboutContent(prev => ({ ...prev, vision: e.target.value }))} />
                </div>
                <div className="flex justify-end items-center gap-4">
                   {saveStatus && <span className={`text-sm ${saveStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{saveStatus}</span>}
                  <button type="submit" className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow hover:bg-yellow-600 disabled:opacity-70" disabled={saveStatus === 'Saving...'}>
                    {saveStatus === 'Saving...' ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;