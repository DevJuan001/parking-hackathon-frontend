import { useState } from "react";
import { formatLabel } from "@/utils/formatLabel";
import { getIncomesChartData } from "@/modules/finance/services/getincomesChartData";

export function useIncomesChartData() {
  const [form, setForm] = useState({
    period: "1y",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [incomesData, setIncomesData] = useState([]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      await getIncomesChartData(form.period);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchIncomesChartData() {
    setLoading(true);

    try {
      const data = await getIncomesChartData(form.period);

      const formattedData = data?.map((item) => ({
        label: formatLabel(item.date),
        ...item,
      }));

      setIncomesData(formattedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    incomesData,
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
    fetchIncomesChartData,
  };
}
