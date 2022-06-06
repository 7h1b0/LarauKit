<script lang="ts">
  import Chart from 'svelte-frappe-charts';

  function getShortMonths() {
    const intl = new Intl.DateTimeFormat(navigator.language, { month: 'short' });

    return Array.from({ length: 12 }, (_, i) => i).map((index) => {
      const date = new Date(2020, index, 5);
      return intl.format(date);
    });
  }

  const expenses = [
    -2599.33, -1583.8300000000004, -1076.7199999999998, -1083.4400000000003, -851.4900000000001,
    -991.6199999999999, -1342.67, -1002.9599999999998, -1152.4899999999998, -8
  ].map((value) => Math.abs(value));

  const incomes = [4132.31, 3659, 3655.4, 3676.6, 3637.4, 3633.8, 3975.37, 3641, 3922.21, 3866.07];

  let data = {
    labels: getShortMonths(),
    datasets: [
      {
        values: incomes
      },
      {
        values: expenses
      }
    ]
  };
</script>

<Chart
  {data}
  type="bar"
  colors={['#edc097', '#b48b64']}
  axisOptions={{
    xAxisMode: 'tick'
  }}
  animate={false}
/>
