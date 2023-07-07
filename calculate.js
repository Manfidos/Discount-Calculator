document.getElementById('discountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    var originalPrice = parseFloat(document.getElementById('originalPrice').value);
    var discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
    var membershipNumber = document.getElementById('membershipNumber').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var taxRate = parseFloat(document.getElementById('taxRate').value);
    var couponCode = document.getElementById('couponCode').value;
    var shippingCost = parseFloat(document.getElementById('shippingCost').value);



    // Perform calculation
    var discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));

    // Check for errors or success
    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        displayErrorMessage('Please enter valid numbers for Original Price and Discount Percentage.');
    } else if (discountedPrice < 0) {
        displayErrorMessage('Discounted price cannot be negative.');
    } else {
        // Apply membership discount
        if (membershipNumber === '7777') {
            discountedPrice -= discountedPrice * 0.05;
        }

        // Apply free shipping code
        if (couponCode === 'CODE') {
            shippingCost = 0;
        }

        // Validate shipping cost with coupon code
        if (couponCode !== 'CODE' && shippingCost === 0) {
            displayErrorMessage('Please enter a valid shipping cost or select a shipping voucher.');
            return;
        }
        // Check for discount percentage limitation
        if (discountPercentage > 90) {
            displayErrorMessage('Discount percentage cannot exceed 90%.');
            return;
        }

        // Check for tax rate limitation
        if (taxRate < 6 || taxRate > 12) {
            displayErrorMessage('Tax rate must be between 6% and 12%.');
            return;
        }

        // Check for shipping cost limitation
        if (shippingCost < 5 || shippingCost > 15) {
            if (couponCode !== 'CODE' || shippingCost !== 0) {
                displayErrorMessage('Shipping cost must be from range RM 5 to RM 15.');
                return;
            }
        }

        // Check for discount percentage limitation
        if (discountPercentage < 0 || discountPercentage > 90) {
            displayErrorMessage('Discount percentage must be between 0 and 90.');
            return;
        }

        // Check for quantity limitation
        if (quantity < 1) {
            displayErrorMessage('Quantity cannot be negative.');
            return;
        }

        var totalPrice = discountedPrice * quantity;
        var totalTax = totalPrice * (taxRate / 100);

        var finalPrice = totalPrice + totalTax + shippingCost;

        // Determine the product name based on the product ID
        var productName;
        switch (parseInt(document.getElementById('productID').value)) {
            case 1:
                productName = 'Shoes';
                break;
            case 2:
                productName = 'Bag';
                break;
            case 3:
                productName = 'Shirt';
                break;
            default:
                productName = 'Unknown';
        }
        
        var totalDiscount = originalPrice - discountedPrice;
        var membershipDiscountValue = 0;
        //var membershipDiscountValue = discountedPrice * (0.05);
        var shippingCostValue = shippingCost;
        var quantityValue = quantity;
        //var discountFormula = 'Discount Amount = Original Price * (Discount Percentage / 100)';
        //var membershipDiscountFormula = 'Membership Discount Amount = Discounted Price * (5 / 100)';
        //var totalPriceFormula = 'Total Price = Final Price with Membership Discount * Quantity';
        //var taxAmountFormula = 'Tax Amount = Total Price * (Tax Rate / 100)';
        //var finalPriceFormula = 'Final Price = Total Price + Tax Amount + Shipping Cost';

        var outputElement = document.getElementById('output');
        outputElement.innerHTML = 'Product Name: ' + productName + '<br>'
        + 'Total Discount: RM ' + totalDiscount.toFixed(2) + '<br>'
        + 'Quantity: ' + quantityValue + ' units' + '<br>'
        + 'Shipping Cost: RM ' + shippingCostValue.toFixed(2) + '<br><br>'
        + 'Final Price: RM ' + finalPrice.toFixed(2);
            //discountFormula + '<br>'
            //+  membershipDiscountFormula + '<br>'
            //+  totalPriceFormula + '<br>'
           // +  taxAmountFormula + '<br>'
           // +  finalPriceFormula + '<br><br>'
           // + 'Final Price: RM ' + finalPrice.toFixed(2);
    }
});

function displayErrorMessage(message) {
    // Display the error message within a div with the id "error"
    var errorElement = document.getElementById('error');
    errorElement.innerHTML = message;
}

// Get the product ID select element
var productSelect = document.getElementById('productID');

// Add change event listener to the product ID select
productSelect.addEventListener('change', function() {
    // Get the selected product ID
    var selectedProductID = parseInt(productSelect.value);

    // Set the original price based on the selected product ID
    var originalPriceInput = document.getElementById('originalPrice');
    switch (selectedProductID) {
        case 1:
            originalPriceInput.value = '300';
            break;
        case 2:
            originalPriceInput.value = '100';
            break;
        case 3:
            originalPriceInput.value = '80';
            break;
        default:
            originalPriceInput.value = '';
    }

    // Disable the original price input field
    originalPriceInput.disabled = true;
});
function displayErrorMessage(message) {
    alert(message);
}

function handleCouponCodeChange(value) {
    var shippingCostInput = document.getElementById('shippingCost');
    
    // Disable shipping cost input if coupon code is "CODE"
    if (value === 'CODE') {
        shippingCostInput.value = '0';
        shippingCostInput.disabled = true;
    } else {
        shippingCostInput.disabled = false;
    }

    // Clear error message when shipping cost changes
    var errorElement = document.getElementById('error');
    errorElement.innerHTML = '';
}

// Get the clear button element
var clearButton = document.getElementById('clearButton');

// Add a click event listener to the clear button
clearButton.addEventListener('click', function() {
    // Clear the input fields
    document.getElementById('originalPrice').value = '';
    document.getElementById('discountPercentage').value = '';
    document.getElementById('membershipNumber').value = '';
    document.getElementById('productID').selectedIndex = 0;
    document.getElementById('quantity').value = '';
    document.getElementById('taxRate').value = '';
    document.getElementById('couponCode').value = '';
    document.getElementById('shippingCost').value = '';

    // Clear the output and error messages
    document.getElementById('output').innerHTML = '';
    document.getElementById('error').innerHTML = '';
});
