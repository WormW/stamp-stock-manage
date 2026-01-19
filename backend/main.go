package main

import (
	"log"
	"net/http"

	"stamp-stock-manage/internal/config"
	"stamp-stock-manage/internal/database"
	"stamp-stock-manage/internal/router"
)

func main() {
	cfg := config.Load()

	db, err := database.New(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	r := router.New(db)

	log.Printf("Server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
