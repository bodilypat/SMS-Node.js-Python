// Users Collection

{
"_id": ObjectId("..."),
"full_name": "Pacha Sunshine",
"email": "pacha@sunshineStore.com",
"password": "hashed_password",
"role": "admin",
"phone_number": "408-320-3408",
"created_at": ISODate("")
}

// Categories Collection


{
    "_id": ObjectId("..."),
    "categoryName": "",
    "description": "",
    "created_at": ISODate("")
}


// Products Collection
{
    "_id": ObjectId("..."),
    "productName": "",
    "categoryId": "",
    "barcode": "",
    "purchasePrice": 0.00,
    "sellingPrice": 0.00,
    "stockQuantity": 0,
    "description": "",
    "created_at": ISODate("")
}


// customers Collection
{
    "_id": ObjectId("..."),
    "full_name": "",
    "email": "",
    "phone_number": "",
    "created_at": ISODate("")
}

// suppiers Collection
{
    "_id": ObjectId("..."),
    "supplierName": "",
    "contactName": "",
    "contactEmail": "",
    "contactPhone": "",
    "created_at": ISODate("")
}

// purchases Collection
{
    "_id": ObjectId("..."),
    "supplierId": ObjectId("..."), // Reference to Suppliers Collection
    "purchasesDate": ISODate(""),
    "totalAmount": 0.00,
    "item   s": [
        {
            "product_id": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        },
        {
            "product_id": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        }
    ]
}

 //sales Collection
{
    "_id": ObjectId("..."),
    "customer_id": ObjectId("..."), // Reference to Customers Collection
    "saleDate": ISODate(""),
    "items": [
        {
            "productId": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        }
    ],
}
