fetch('../csv/my.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    const tableBody = document.querySelector('#myTable tbody');

    rows.forEach(row => {
      const columns = row.split(',');
      const tableRow = document.createElement('tr');

      columns.forEach(column => {
        const tableData = document.createElement('td');
        tableData.textContent = column;
        tableRow.appendChild(tableData);
      });

      tableBody.appendChild(tableRow);
    });
  });