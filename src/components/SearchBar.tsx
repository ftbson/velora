"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productsData, getProductCategoryName, type Product } from "@/data/products";
import { searchProducts } from "@/utils/search";

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
  className?: string;
}

const POPULAR_SUGGESTIONS = [
  "CUBE",
  "Trekking",
  "Mountainbike",
  "Kinder",
  "Helm",
  "Zubehör",
];

export default function SearchBar({
  placeholder = "E-Bikes, Zubehör suchen...",
  autoFocus = false,
  onNavigate,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter products live as user types
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query, productsData);
  }, [query]);

  const maxPreview = 6;
  const previewProducts = matchingProducts.slice(0, maxPreview);
  const totalCount = matchingProducts.length;

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsOpen(false);
    onNavigate?.();
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSelectProduct = (productId: string) => {
    setIsOpen(false);
    onNavigate?.();
    router.push(`/produkt/${productId}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`velora-search-wrapper ${className}`}
      role="search"
    >
      <form onSubmit={handleSearchSubmit} className="velora-search-box">
        <button
          type="submit"
          className="velora-search-submit-btn"
          aria-label="Recherche starten"
        >
          <i className="fa-solid fa-magnifying-glass velora-search-icon"></i>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="velora-search-input"
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          aria-expanded={isOpen && query.trim().length > 0}
          aria-autocomplete="list"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="velora-search-clear-btn"
            aria-label="Suchfeld leeren"
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        )}
      </form>

      {/* Dropdown Live Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="velora-search-dropdown" role="region" aria-label="Suchergebnisse">
          {totalCount > 0 ? (
            <>
              <div className="velora-search-dropdown-header">
                <span>
                  <strong>{totalCount}</strong>{" "}
                  {totalCount === 1 ? "Produkt gefunden" : "Produkte gefunden"}
                </span>
                <span className="velora-search-dropdown-hint">
                  Drücken Sie Enter für alle
                </span>
              </div>

              <div className="velora-search-results-list">
                {previewProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product.id)}
                    className="velora-search-result-item"
                  >
                    <div className="velora-search-thumb-wrap">
                      <Image
                        src={product.image || product.imageFile || "/img/logo.png"}
                        alt={product.title}
                        width={54}
                        height={54}
                        className="velora-search-thumb"
                      />
                    </div>

                    <div className="velora-search-result-info">
                      <div className="velora-search-brand-row">
                        <span className="velora-search-brand">{product.brand}</span>
                        <span className="velora-search-category">
                          {getProductCategoryName(product.category)}
                        </span>
                      </div>
                      <div className="velora-search-result-title">
                        {product.title}
                      </div>
                    </div>

                    <div className="velora-search-result-price-wrap">
                      <span className="velora-search-result-price">
                        CHF {product.price?.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="velora-search-result-old-price">
                          CHF {product.oldPrice?.toFixed(2)}
                        </span>
                      )}
                      {product.discount && (
                        <span className="velora-search-result-discount">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="velora-search-dropdown-footer">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="velora-search-view-all-btn"
                >
                  Alle {totalCount} Ergebnisse für „{query.trim()}“ ansehen
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="velora-search-empty-state">
              <div className="velora-search-empty-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <p className="velora-search-empty-title">
                Keine Ergebnisse für „<strong>{query.trim()}</strong>“
              </p>
              <p className="velora-search-empty-desc">
                Versuchen Sie es mit einer Marke, einem Modell oder einer Kategorie.
              </p>
              <div className="velora-search-suggestions">
                <span className="velora-search-suggestions-label">Beliebt:</span>
                <div className="velora-search-tags">
                  {POPULAR_SUGGESTIONS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleSuggestionClick(tag)}
                      className="velora-search-tag"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
