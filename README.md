# Automation Exercise API Documentation

## Overview
REST API for e-commerce automation testing with endpoints for product management, user authentication, and account operations.

**Base URL**: `https://automationexercise.com/api/`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://testing-team-8846.postman.co/workspace/DEPI_SWT_Project~6125e52a-0763-4acb-8b09-2e7e33bb1b46/collection/22302763-61f8cfd9-aae0-4f36-bacd-8f1c2d31d68b?action=share&creator=22302763
)

## Authentication
| Method        | Endpoint        | Description                  |
|---------------|-----------------|------------------------------|
| `POST`        | `/verifyLogin`  | Email + password authentication |

## Error Handling
**Common Error Codes**:
```http
400 Bad Request         405 Method Not Allowed
404 Not Found           500 Internal Server Error
```

**Error Response Format**:
```json
{
  "responseCode": 400,
  "message": "Error description"
}
```

## Rate Limits
- 100 requests/minute per IP address
- JSON responses for exceeded limits:
```json
{
  "responseCode": 429,
  "message": "Too many requests"
}
```

---

## API Endpoints

### Products
#### Get All Products
```http
GET /productsList
```

**Response**:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {"usertype": "Women"},
        "category": "Tops"
      }
    }
  ]
}
```

#### Search Products
```http
POST /searchProduct
```

**Parameters**:
| Name            | Type    | Required | Description      |
|-----------------|---------|----------|------------------|
| `search_product`| string  | Yes      | Search keyword   |

**Example Request**:
```bash
curl -X POST "{{url}}/searchProduct" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "search_product=tshirt"
```

---

### User Authentication
#### Verify Login
```http
POST /verifyLogin
```

**Parameters**:
| Name       | Type    | Required | Description  |
|------------|---------|----------|--------------|
| `email`    | string  | Yes      | User email   |
| `password` | string  | Yes      | User password|

**Success Response**:
```json
{
  "responseCode": 200,
  "message": "User exists!"
}
```

---

### Account Management
#### Create User Account
```http
POST /createAccount
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePass123",
  "title": "Mr",
  "birth_date": "15",
  "birth_month": "05",
  "birth_year": "1990",
  "address": "123 Main St",
  "country": "United States"
}
```

**Response**:
```json
{
  "responseCode": 201,
  "message": "User created!"
}
```

---

## Test Cases
### Product Endpoint Validation
```javascript
// Verify product properties
pm.test("Product has required properties", () => {
  const product = pm.response.json().products[0];
  pm.expect(product).to.have.keys('id', 'name', 'price', 'brand', 'category');
});
```

### Authentication Tests
```javascript
// Test invalid credentials
pm.test("Invalid login returns 404", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json().message).to.eql("User not found!");
});
```

---

## Response Codes
| Code | Meaning                  | Typical Scenarios                |
|------|--------------------------|-----------------------------------|
| 200  | OK                       | Successful GET/PUT/DELETE        |
| 201  | Created                  | Successful account creation      |
| 400  | Bad Request              | Missing required parameters      |
| 404  | Not Found                | User/product not found           |
| 405  | Method Not Allowed       | Invalid HTTP method used         |
| 500  | Internal Server Error    | Server-side exceptions           |

## Contribution
1. Fork repository
2. Create feature branch
3. Submit pull request

## License
ISC License - See [LICENSE](https://automationexercise.com/license) for details
