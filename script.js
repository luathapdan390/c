document.addEventListener('DOMContentLoaded', () => {

    // Hàm định dạng số thành chuỗi tiền tệ (ví dụ: 1000000 -> 1,000,000)
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'decimal' 
        }).format(Math.round(number));
    };

    // -----------------------------------------------------------------
    // 1. CÔNG THỨC LỢI NHUẬN KHÁCH HÀNG
    // Lợi nhuận = Customers * Conversion * Value * Frequency * Margin
    // -----------------------------------------------------------------
    
    const profitInputs = [
        document.getElementById('customers'),
        document.getElementById('conversion'),
        document.getElementById('value'),
        document.getElementById('frequency'),
        document.getElementById('margin')
    ];
    const profitResultElement = document.getElementById('profitResult');

    const calculateProfit = () => {
        const C = parseFloat(profitInputs[0].value) || 0;
        const R = parseFloat(profitInputs[1].value) / 100 || 0; // Tỷ lệ chuyển đổi
        const V = parseFloat(profitInputs[2].value) || 0;
        const F = parseFloat(profitInputs[3].value) || 0;
        const M = parseFloat(profitInputs[4].value) / 100 || 0; // Tỷ suất lợi nhuận

        // Công thức: A * B * C * D * E
        const result = C * R * V * F * M;
        
        // Hiển thị và áp dụng hiệu ứng "nhảy"
        profitResultElement.textContent = formatCurrency(result) + ' VND';
        
        // Kích hoạt lại animation để tạo hiệu ứng "nhảy"
        profitResultElement.classList.remove('animated-number');
        void profitResultElement.offsetWidth; // Trigger reflow
        profitResultElement.classList.add('animated-number');
    };

    // Lắng nghe sự kiện thay đổi trên tất cả các trường input của công thức 1
    profitInputs.forEach(input => {
        input.addEventListener('input', calculateProfit);
    });

    // -----------------------------------------------------------------
    // 2. CÔNG THỨC LÃI KÉP (Compound Interest)
    // Công thức tính tổng cuối kỳ (bao gồm các khoản đóng góp định kỳ)
    // -----------------------------------------------------------------

    const compoundInputs = [
        document.getElementById('initial'),
        document.getElementById('monthlyAdd'),
        document.getElementById('annualRate'),
        document.getElementById('years')
    ];
    const compoundResultElement = document.getElementById('compoundResult');
    const yearsDisplayElement = document.getElementById('yearsDisplay');
    
    const calculateCompound = () => {
        const P = parseFloat(compoundInputs[0].value) || 0; // Initial Principal
        const PMT = parseFloat(compoundInputs[1].value) || 0; // Monthly Addition
        const r_annual = parseFloat(compoundInputs[2].value) / 100 || 0; // Annual Rate
        const t = parseFloat(compoundInputs[3].value) || 0; // Number of Years

        // Tính lãi suất hàng tháng (r_monthly) và tổng số kỳ (n)
        const n = t * 12; // Compounding frequency (monthly)
        const r_monthly = r_annual / 12;

        yearsDisplayElement.textContent = t; // Cập nhật số năm hiển thị

        let futureValue = 0;

        if (r_monthly === 0) {
            // Trường hợp lãi suất 0%
            futureValue = P + PMT * n;
        } else {
            // Phần giá trị tương lai từ tiền gốc (P)
            const FV_principal = P * Math.pow((1 + r_monthly), n);
            
            // Phần giá trị tương lai từ các khoản đóng góp định kỳ (PMT)
            const FV_annuity = PMT * ((Math.pow((1 + r_monthly), n) - 1) / r_monthly);
            
            futureValue = FV_principal + FV_annuity;
        }

        // Hiển thị và áp dụng hiệu ứng "nhảy"
        compoundResultElement.textContent = formatCurrency(futureValue) + ' VND';
        
        // Kích hoạt lại animation
        compoundResultElement.classList.remove('animated-number');
        void compoundResultElement.offsetWidth; // Trigger reflow
        compoundResultElement.classList.add('animated-number');
    };

    // Lắng nghe sự kiện thay đổi trên tất cả các trường input của công thức 2
    compoundInputs.forEach(input => {
        input.addEventListener('input', calculateCompound);
    });
    
    // Chạy tính toán lần đầu tiên để hiển thị kết quả mặc định
    calculateProfit();
    calculateCompound();
});