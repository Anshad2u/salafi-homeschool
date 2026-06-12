'use client';

import { useState, useEffect, useCallback } from 'react';
import { REC_BOOKS } from '@/lib/curriculum';
import { toast } from '@/components/Toast';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number;
}

export default function ReadingPage() {
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Fetch children list
  useEffect(() => {
    fetch('/api/family')
      .then((r) => r.json())
      .then((data) => {
        const kids = (data.profiles || []).filter((p: Profile) => p.role === 'STUDENT');
        setChildren(kids);
        if (kids.length > 0) setSelectedChild(kids[0].id);
      })
      .catch(console.error);
  }, []);

  // Fetch books for selected child
  const fetchBooks = useCallback(async () => {
    if (!selectedChild) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/books?profileId=${selectedChild}`);
      if (res.ok) {
        setBooks(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
    setLoading(false);
  }, [selectedChild]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddBook = async () => {
    if (!newTitle.trim()) {
      toast('Please enter a book title');
      return;
    }

    try {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: selectedChild,
          title: newTitle.trim(),
          author: newAuthor.trim(),
          status: 'READING',
        }),
      });
      setNewTitle('');
      setNewAuthor('');
      fetchBooks();
      toast('Book added! 📚');
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };

  const handleSetRating = async (bookId: string, rating: number) => {
    try {
      await fetch(`/api/books/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      fetchBooks();
    } catch (err) {
      console.error('Failed to update rating:', err);
    }
  };

  const handleSetStatus = async (bookId: string, status: string) => {
    try {
      await fetch(`/api/books/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (status === 'FINISHED') {
        toast('Book finished! 📚');
      }
      fetchBooks();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
      fetchBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  const handleAddRecommended = async (title: string, author: string) => {
    try {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: selectedChild,
          title,
          author,
          status: 'WISHLIST',
        }),
      });
      fetchBooks();
      toast('Book added to wishlist! ✅');
    } catch (err) {
      console.error('Failed to add recommended book:', err);
    }
  };

  const isBookAdded = (title: string) => {
    return books.some((b) => b.title === title);
  };

  if (children.length === 0 && !loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>No children profiles found.</div>;
  }

  return (
    <div>
      {/* Child Tabs */}
      <div className="tabs">
        {children.map((child) => (
          <button
            key={child.id}
            className={`tab${selectedChild === child.id ? ' sel' : ''}`}
            onClick={() => setSelectedChild(child.id)}
          >
            {child.avatar} {child.name}
          </button>
        ))}
      </div>

      {/* Add Book Form */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0' }}>➕ Add a Book</h3>
        <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            className="btn btn-soft"
            type="text"
            placeholder="Title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddBook();
            }}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <input
            className="btn btn-soft"
            type="text"
            placeholder="Author..."
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddBook();
            }}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <button className="btn" onClick={handleAddBook}>
            + Add Book
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0' }}>📚 My Books</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>Loading...</div>
        ) : books.length === 0 ? (
          <div className="muted" style={{ textAlign: 'center', padding: '1rem' }}>
            No books yet. Add your first book above!
          </div>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="row"
              style={{
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border, #eee)',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontWeight: 600 }}>{book.title}</div>
                <div className="muted" style={{ fontSize: '0.85em' }}>{book.author}</div>
              </div>

              {/* Star Rating */}
              <div className="row" style={{ gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    role="button"
                    style={{ cursor: 'pointer', fontSize: '1.2em' }}
                    onClick={() => handleSetRating(book.id, star)}
                  >
                    {star <= book.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>

              {/* Status Dropdown */}
              <select
                className="btn btn-soft btn-sm"
                value={book.status}
                onChange={(e) => handleSetStatus(book.id, e.target.value)}
              >
                <option value="READING">Reading</option>
                <option value="FINISHED">Finished</option>
                <option value="WISHLIST">Wishlist</option>
              </select>

              {/* Delete */}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Recommended Books */}
      <div className="card">
        <h3 style={{ margin: '0 0 0.75rem 0' }}>🌟 Recommended Islamic Books</h3>
        {REC_BOOKS.map(([title, author], index) => {
          const added = isBookAdded(title);
          return (
            <div
              key={index}
              className="row"
              style={{
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border, #eee)',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600 }}>{title}</div>
                <div className="muted" style={{ fontSize: '0.85em' }}>{author}</div>
              </div>
              {added ? (
                <span className="tag">Added</span>
              ) : (
                <button
                  className="btn btn-sm btn-soft"
                  onClick={() => handleAddRecommended(title, author)}
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
