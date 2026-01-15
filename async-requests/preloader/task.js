document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');

    async function loadCurrencyRates() {
        try {
            loader.classList.add('loader_active');

            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            const valute = data.response.Valute;

            itemsContainer.innerHTML = '';

            for (const currencyCode in valute) {
                if (valute.hasOwnProperty(currencyCode)) {
                    const currency = valute[currencyCode];
                    
                    const item = document.createElement('div');
                    item.className = 'item';

                    const code = document.createElement('div');
                    code.className = 'item__code';
                    code.textContent = currency.CharCode;

                    const value = document.createElement('div');
                    value.className = 'item__value';
                    value.textContent = currency.Value.toFixed(2);

                    const currencyLabel = document.createElement('div');
                    currencyLabel.className = 'item__currency';
                    currencyLabel.textContent = 'руб.';

                    item.appendChild(code);
                    item.appendChild(value);
                    item.appendChild(currencyLabel);
                    itemsContainer.appendChild(item);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке курсов валют:', error);
            itemsContainer.innerHTML = '<p>Не удалось загрузить курсы валют. Попробуйте позже.</p>';
        } finally {
            loader.classList.remove('loader_active');
        }
    }

    loadCurrencyRates();
});
