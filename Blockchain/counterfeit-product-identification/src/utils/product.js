export function handleRow(label, value) {
    return (
        <div className="row">
            <div className="col-5">{label}</div>
            <div className="col">{value}</div>
        </div>
    );
}

export function handleStatus(code, allStatus) {
    return (
        <div className="row status-body">
            <h6 className="card-title">Status</h6>

            {Object.keys(allStatus).length > 0 && allStatus[code].length > 0 ? (
                allStatus[code].map((status) => (
                    <div key={status[2]} className="card-footer">
                        {handleRow("Status", status[0])}
                        {handleRow("Updated By Seller", status[1])}
                        {handleRow("Updated On", status[2])}
                    </div>
                ))
            ) : (
                <div className="card-footer">No Status</div>
            )}
        </div>
    );
}

export function displayProduct(product, status) {
    return (
        <div className="card">
            <h6 className="card-header">
                {handleRow("Product Code", product.code)}
            </h6>
            <div className="card-body">
                {handleRow("Category", product.category)}
                {handleRow("Name", product.name)}
                {handleRow("Manufactured By", product.manufacturedBy)}
                {handleRow("Manufacture Date", product.manufactureDate)}
                {handleRow("Product Added On", product.date)}

                {handleStatus(product.code, status)}
            </div>
        </div>
    );
}
