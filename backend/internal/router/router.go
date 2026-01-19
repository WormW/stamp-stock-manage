package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jmoiron/sqlx"

	"stamp-stock-manage/internal/handler"
	"stamp-stock-manage/internal/middleware"
)

func New(db *sqlx.DB) *chi.Mux {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Recovery)
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "tauri://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Handlers
	healthHandler := handler.NewHealthHandler()

	// Routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/health", healthHandler.Check)

		// Add more routes here as you build features
	})

	return r
}
