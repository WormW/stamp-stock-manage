package handler

import (
	"net/http"

	"stamp-stock-manage/pkg/response"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (h *HealthHandler) Check(w http.ResponseWriter, r *http.Request) {
	response.Success(w, map[string]string{
		"status": "ok",
	})
}
