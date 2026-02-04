//src/features/inventory/components/StockForm.jsx 

import Button from "../../../components/common/Button";

const StockForm = ({ product, quantity,onSubmit, onChange, formData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="stock-form">
            <div className="form-group">
                <label htmlFor="product">Product:</label>
                <input
                    type="text"
                    id="product"
                    name="product"
                    value={product}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => onChange("quantity", e.target.value)}
                    className="form-input"
                    required
                />
            </div>
            {type === "in" && (
                <div className="form-group">
                    <label className="form-label">Expiry Date (optional):</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate || ""}
                        onChange={(e) => onChange("expiryDate", e.target.value)}
                        className="form-input"
                    />
                </div>
            )}
            {type === "out" && (
                <div className="form-group">
                    <label className="form-label">Reason for Stock Out:</label>
                    <input
                        type="text"
                        name="reason"
                        value={formData.reason || ""}
                        onChange={(e) => onChange("reason", e.target.value)}
                        className="form-input"
                    />
                </div>
            )}
            <Button type="submit" className="submit-button">
                {type === "in" ? "Add Stock" : "Remove Stock"}
            </Button>
        </form>
    );
};

export default StockForm;

