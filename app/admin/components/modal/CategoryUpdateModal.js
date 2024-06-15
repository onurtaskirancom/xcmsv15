import { useState, useEffect } from 'react';

const CategoryUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingCategory,
}) => {
  const [form, setForm] = useState({ name: updatingCategory.name });

  useEffect(() => {
    setForm({ name: updatingCategory.name });
  }, [updatingCategory]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate(form);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-600 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Update Category</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 w-full bg-gray-800 text-white border-gray-300"
              placeholder="Give it a name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-500 text-white p-2 rounded"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdateModal;
