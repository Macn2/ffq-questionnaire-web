const CHART_DEFAULT_OPTIONS = {
  chart: {
    height: 540,
    type: "rangeArea",
    animations: {
      speed: 500,
    },
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
    events: {
      legendClick: (event, chartContext, config) => {
        event.preventDefault();
      }
    }
  },
  stroke: {
    curve: "straight",
    width: [0, 0, 0, 3],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      const percentileData = data.percentile;
      if (seriesIndex !== 3) return null;
      return (
        '<div style="padding: 8px; display: flex; align-items: center;gap: 8px;"><div style="background-color: ' +
        percentileData.color +
        '; height: 16px; width: 16px; border-radius: 99px;">' +
        "</div>" +
        "<span>" +
        percentileData.percentile +
        "</span>" +
        "</div>"
      );
    },
  },
  markers: {
    size: [0, 0, 0, 6],
    strokeWidth: 1.5
  },
  title: {
    text: "Weight-for-length Percentiles (boys)",
    align: "left",
  },
  xaxis: {
    type: "numeric",
    title: {
      text: "Length (cm)",
    },
    min: 45,
    max: 110,
    tickAmount: 10,
  },
  yaxis: {
    title: {
      text: "Weight (kg)",
    },
    min: 0,
    max: 25,
    labels: {
      formatter: (value) => value?.toFixed?.(0) ?? value,
    },
  },
};

export default CHART_DEFAULT_OPTIONS;
