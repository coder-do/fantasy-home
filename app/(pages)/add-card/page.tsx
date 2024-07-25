'use client'
import Header from '@/app/components/header';
import './st.css'
import { uploadFile } from '@uploadcare/upload-client';
import db from '@/app/utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";

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
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    const arr: any = [];
    getDocs(collection(db, "products"))
      .then(data => {
        data.forEach((doc) => {
          arr.push(doc.data());
        });
        const groupedByCategory = arr.reduce((acc: any, item: any) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push({
            title: item.title,
            image: item.image,
            description: item.description
          });
          return acc;
        }, {});
        setData(groupedByCategory);
        setCategories(Object.keys(groupedByCategory));
        setLoading(false);
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, category: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('category', category);

    setFormLoading(true);

    try {
      const fileInput = formData.get('image') as File;
      if (!fileInput) {
        throw new Error('No image file selected');
      }

      const result = await uploadFile(fileInput, {
        publicKey: 'dbe22a4fce547e417973',
        store: 'auto',
        metadata: {
          subsystem: 'js-client',
          pet: 'cat'
        }
      });

      const imageUrl = result.cdnUrl;
      const description = formData.get('description');
      const title = formData.get('title');
      const category: any = formData.get('category');

      await addDoc(collection(db, "products"), {
        title: title,
        description: description,
        image: imageUrl,
        category: category
      });

      setData((prevData: any) => {
        if (!prevData) return { [category]: [category] };
        return {
          ...prevData,
          [category]: prevData[category] ? [...prevData[category], {
            title: title,
            description: description,
            image: imageUrl,
            category: category
          }] : [{
            title: title,
            description: description,
            image: imageUrl,
            category: category
          }],
        };
      });
      setFormLoading(false);
      getData();
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
      const fileInput = formData.get('image') as File;
      if (!fileInput) {
        throw new Error('No image file selected');
      }

      const result = await uploadFile(fileInput, {
        publicKey: 'dbe22a4fce547e417973',
        store: 'auto',
        metadata: {
          subsystem: 'js-client',
          pet: 'cat'
        }
      });

      const imageUrl = result.cdnUrl;
      const description = formData.get('description');
      const title = formData.get('title');
      const category: any = formData.get('category');

      await addDoc(collection(db, "products"), {
        title: title,
        description: description,
        image: imageUrl,
        category: category
      });

      setData((prevData: any) => {
        if (!prevData) return { [category]: [category] };
        return {
          ...prevData,
          [category]: prevData[category] ? [...prevData[category], {
            title: title,
            description: description,
            image: imageUrl,
            category: category
          }] : [{
            title: title,
            description: description,
            image: imageUrl,
            category: category
          }],
        };
      });

      form.reset();
      getData();
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
