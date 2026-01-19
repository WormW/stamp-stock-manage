package database

import (
	"github.com/jmoiron/sqlx"
	_ "modernc.org/sqlite"
)

func New(databaseURL string) (*sqlx.DB, error) {
	db, err := sqlx.Connect("sqlite", databaseURL)
	if err != nil {
		return nil, err
	}

	// Enable foreign keys
	_, err = db.Exec("PRAGMA foreign_keys = ON")
	if err != nil {
		return nil, err
	}

	// Run migrations
	if err := migrate(db); err != nil {
		return nil, err
	}

	return db, nil
}

func migrate(db *sqlx.DB) error {
	schema := `
	CREATE TABLE IF NOT EXISTS migrations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE,
		applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	`

	_, err := db.Exec(schema)
	return err
}
