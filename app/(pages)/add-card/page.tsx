'use client'
import Header from '@/app/components/header';
import './st.css'

import React, { useEffect, useState, FormEvent } from 'react';

interface Entry {
  title: string;
  description: string;
  image: string;
}

interface Data {
  [category: string]: Entry[];
}

const FetchData = () => {
  const [data, setData] = useState<Data | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/fetchData')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCategories(Object.keys(data));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, category: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('category', category);

    setFormLoading(true);

    try {
      const response = await fetch('/api/addEntry', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error adding entry');
      }

      const newEntry = await response.json();

      setData((prevData: any) => {
        if (!prevData) return { [category]: [newEntry.entry] };
        return {
          ...prevData,
          [category]: prevData[category] ? [...prevData[category], newEntry.entry] : [newEntry.entry],
        };
      });

      form.reset();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleNewCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newCategory = formData.get('newCategory') as string;

    if (!newCategory) {
      return setError('Category name is required');
    }

    // Add an empty entry for the new category
    formData.append('category', newCategory);

    setFormLoading(true);

    try {
      const response = await fetch('/api/addEntry', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error adding new category');
      }

      const newEntry = await response.json();
      setData((prevData) => ({
        ...prevData,
        [newCategory]: (prevData as any)[newCategory] ? [...(prevData as any)[newCategory], newEntry.entry] : [newEntry.entry],
      }));

      setCategories((prevCategories) => [...prevCategories, newCategory]);
      form.reset();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className='main' style={{ marginTop: '7vw' }}>
        {categories.map((category) => (
          <form key={category} onSubmit={(e) => handleSubmit(e, category)}>
            <div className="fForm">
              <h2>{category}</h2>
              <input id="image" type="file" name="image" required />
              <input id="title" placeholder="Title" type="text" name="title" required />
              <input id="description" placeholder="Description" type="text" name="description" required />
              <button type="submit" disabled={formLoading}>
                {formLoading ? 'Adding...' : `Add to ${category}`}
              </button>
            </div>
          </form>
        ))}

        <form onSubmit={handleNewCategorySubmit}>
          <div className="fForm">
            <h2>Add New Category</h2>
            <input id="newCategory" placeholder="New Category Name" type="text" name="newCategory" required />
            <input id="newImage" type="file" name="image" />
            <input id="newTitle" placeholder="Title" type="text" name="title" />
            <input id="newDescription" placeholder="Description" type="text" name="description" />
            <button type="submit" disabled={formLoading}>
              {formLoading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FetchData;
