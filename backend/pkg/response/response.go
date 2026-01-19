package response

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty"`
	Error   string      `json:"error,omitempty"`
}

type PaginatedResponse struct {
	Data     interface{} `json:"data"`
	Total    int64       `json:"total"`
	Page     int         `json:"page"`
	PageSize int         `json:"pageSize"`
}

func JSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(Response{Data: data})
}

func Success(w http.ResponseWriter, data interface{}) {
	JSON(w, http.StatusOK, data)
}

func Created(w http.ResponseWriter, data interface{}) {
	JSON(w, http.StatusCreated, data)
}

func Error(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(Response{Error: message})
}

func BadRequest(w http.ResponseWriter, message string) {
	Error(w, http.StatusBadRequest, message)
}

func NotFound(w http.ResponseWriter, message string) {
	Error(w, http.StatusNotFound, message)
}

func InternalError(w http.ResponseWriter, message string) {
	Error(w, http.StatusInternalServerError, message)
}

func Paginated(w http.ResponseWriter, data interface{}, total int64, page, pageSize int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(PaginatedResponse{
		Data:     data,
		Total:    total,
		Page:     page,
		PageSize: pageSize,
	})
}
