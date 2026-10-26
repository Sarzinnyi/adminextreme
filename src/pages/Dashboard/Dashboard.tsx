import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiBox,
  FiCalendar,
  FiChevronRight,
  FiDownload,
  FiLayers,
  FiPlus,
  FiRefreshCw,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { usingContext } from "../../context/Context";
import { Acontext } from "../Auth/Acontext";
import "../../styles/Dashboard/Dashboard.css";

type Sale = {
  category: string;
  name: string;
  user_id: string | number;
  size: string;
  qty: number;
  created_at: string;
};
type Totals = {
  totalproducts: number;
  totalstocks: number;
  totalorders: number;
  totalcustomers: number;
};
type Stock = { category: string; total: number };
type TopProduct = { category: string; name: string; qty: number };
type ChartDay = { date: string; qty: number };
const colors = ["#284f3d", "#a8c57f", "#dce9bd", "#b5c8bf", "#e1e9e3"];
const number = (value: number) => new Intl.NumberFormat("en-US").format(value);

export default function Dashboard() {
  const { url } = usingContext();
  const context = useContext(Acontext);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);
  const [top, setTop] = useState<TopProduct[]>([]);
  const [days, setDays] = useState<ChartDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState("30");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const request = async (path: string) => {
        const response = await fetch(`${url}${path}`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        if (data.success === false) throw new Error("Data unavailable");
        return data;
      };
      const results = await Promise.allSettled([
        request("/api/chart/total"),
        request("/api/chart/recentsales"),
        request("/api/chart/totalstock"),
        request("/api/products/qtybydays"),
        request("/api/chart/topsales"),
      ]);
      if (controller.signal.aborted) return;
      setError(results.some((result) => result.status === "rejected"));
      const [totalResult, salesResult, stockResult, daysResult, topResult] =
        results;
      if (totalResult.status === "fulfilled") setTotals(totalResult.value);
      if (salesResult.status === "fulfilled")
        setSales(
          Array.isArray(salesResult.value.recentsales)
            ? salesResult.value.recentsales
            : [],
        );
      if (stockResult.status === "fulfilled")
        setStock(
          (stockResult.value.totalstock || []).map((item: Stock) => ({
            ...item,
            total: Number(item.total) || 0,
          })),
        );
      if (daysResult.status === "fulfilled")
        setDays(
          Object.entries(daysResult.value)
            .filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key))
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, qty]) => ({ date, qty: Number(qty) || 0 })),
        );
      if (topResult.status === "fulfilled")
        setTop(Object.values(topResult.value.topsales || {}));
      setLoading(false);
    }
    void load();
    return () => controller.abort();
  }, [url, refresh]);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const periodStart = new Date(today);
  periodStart.setDate(periodStart.getDate() - Number(period) + 1);
  periodStart.setHours(0, 0, 0, 0);
  const chartDays = days.filter((day) => {
    const date = new Date(`${day.date}T00:00:00`);
    return date >= periodStart && date <= today;
  });
  const stockTotal = stock.reduce((sum, item) => sum + item.total, 0);
  const incoming = chartDays.reduce((sum, day) => sum + day.qty, 0);
  const firstName = context?.auth?.name?.split(" ")[0];
  const cards = [
    {
      label: "Total products",
      value: totals?.totalproducts,
      caption: "Across your catalog",
      icon: FiShoppingBag,
      className: "sage",
      to: "/clothes",
    },
    {
      label: "Units in stock",
      value: totals?.totalstocks,
      caption: "Ready for their next chapter",
      icon: FiLayers,
      className: "sand",
      to: "/history/instock",
    },
    {
      label: "Total orders",
      value: totals?.totalorders,
      caption: "Every order, one place",
      icon: FiBox,
      className: "lavender",
      to: "/orders",
    },
    {
      label: "Customers",
      value: totals?.totalcustomers,
      caption: "Your growing community",
      icon: FiUsers,
      className: "peach",
      to: null,
    },
  ];
  const exportSales = () => {
    const escape = (value: unknown) => {
      const text = String(value ?? "");
      return `"${(/^[=+@\-\t\r]/.test(text) ? "'" + text : text).replace(/"/g, '""')}"`;
    };
    const rows = [
      ["Product", "Category", "Customer", "Size", "Quantity", "Date"],
      ...sales.map((sale) => [
        sale.name,
        sale.category,
        sale.user_id,
        sale.size,
        sale.qty,
        sale.created_at,
      ]),
    ];
    const blobUrl = URL.createObjectURL(
      new Blob([rows.map((row) => row.map(escape).join(",")).join("\r\n")], {
        type: "text/csv;charset=utf-8;",
      }),
    );
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "extreme-recent-sales.csv";
    link.click();
    URL.revokeObjectURL(blobUrl);
  };
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            YOUR BUSINESS, IN FOCUS
          </div>
          <h1>
            Store overview<span className="heading-dot">.</span>
          </h1>
          <p>
            Welcome back{firstName ? `, ${firstName}` : ""}. Let’s make good
            things happen.
          </p>
        </div>
        <div className="heading-actions">
          <button
            className="secondary-button"
            onClick={exportSales}
            disabled={!sales.length}
          >
            <FiDownload />
            Export report
          </button>
          <Link className="primary-button" to="/addnew/clothes">
            <FiPlus />
            Add product
          </Link>
        </div>
      </div>
      {error && (
        <div className="data-notice" role="status">
          <span>
            Some store data couldn’t be loaded. Available data is shown below.
          </span>
          <button
            onClick={() => {
              setLoading(true);
              setRefresh((value) => value + 1);
            }}
            disabled={loading}
          >
            <FiRefreshCw />
            Retry
          </button>
        </div>
      )}
      <section className="metric-grid" aria-label="Store totals">
        {cards.map((card) => (
          <article className="metric-card" key={card.label}>
            <div className="metric-top">
              <span>{card.label}</span>
              <span className={`metric-icon ${card.className}`}>
                <card.icon size={17} />
              </span>
            </div>
            <div className="metric-value">
              {loading ? (
                <span className="skeleton" />
              ) : card.value == null ? (
                "—"
              ) : (
                number(Number(card.value))
              )}
            </div>
            <div className="metric-bottom">
              <span>{card.caption}</span>
              {card.to && (
                <Link
                  to={card.to}
                  aria-label={`View ${card.label.toLowerCase()}`}
                >
                  <FiArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
      <div className="analytics-grid">
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Inventory activity</h2>
              <p>A closer look at what’s coming in.</p>
            </div>
            <label className="period-select">
              <FiCalendar />
              <select
                aria-label="Inventory chart period"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
              >
                <option value="30">Last 30 days</option>
                <option value="7">Last 7 days</option>
              </select>
            </label>
          </div>
          <div className="activity-summary">
            <strong>{chartDays.length ? number(incoming) : "—"}</strong>
            <span>
              units received{" "}
              <span className="chart-key">
                <i />
                Stock in
              </span>
            </span>
          </div>
          <div className="activity-chart">
            {chartDays.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartDays}
                  margin={{ top: 15, right: 8, bottom: 0, left: -24 }}
                >
                  <defs>
                    <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#829c62"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#829c62" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 6"
                    stroke="#edf0e8"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#8e9a8b" }}
                    tickMargin={13}
                    minTickGap={28}
                    tickFormatter={(date) =>
                      new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#8e9a8b" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e6ece0",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    name="Units received"
                    type="monotone"
                    dataKey="qty"
                    stroke="#507348"
                    strokeWidth={2.5}
                    isAnimationActive={false}
                    fill="url(#stockFill)"
                    activeDot={{
                      r: 5,
                      fill: "#355c3c",
                      stroke: "white",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                <FiLayers size={30} />
                <strong>
                  {loading
                    ? "Loading inventory activity…"
                    : "Your next chapter starts here"}
                </strong>
                <p>Stock movements will appear as your inventory grows.</p>
              </div>
            )}
          </div>
        </section>
        <section className="panel stock-panel">
          <div className="panel-heading">
            <div>
              <h2>Stock by category</h2>
              <p>Your collection at a glance.</p>
            </div>
            <span className="subtle-icon">
              <FiShoppingBag />
            </span>
          </div>
          <div className="stock-donut">
            {stockTotal > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stock}
                    dataKey="total"
                    nameKey="category"
                    innerRadius="69%"
                    outerRadius="90%"
                    stroke="white"
                    strokeWidth={5}
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive={false}
                  >
                    {stock.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-donut" />
            )}
            <div className="donut-center">
              <span>Total units</span>
              <strong>
                {loading ? "…" : stock.length ? number(stockTotal) : "—"}
              </strong>
            </div>
          </div>
          <div className="stock-legend">
            {stock.length ? (
              stock.map((item, index) => (
                <div key={item.category}>
                  <span>
                    <i style={{ background: colors[index % colors.length] }} />
                    {item.category}
                  </span>
                  <strong>
                    {number(item.total)}{" "}
                    <small>
                      {stockTotal
                        ? Math.round((item.total / stockTotal) * 100)
                        : 0}
                      %
                    </small>
                  </strong>
                </div>
              ))
            ) : (
              <p>
                {loading
                  ? "Loading your collection…"
                  : "No category data available yet."}
              </p>
            )}
          </div>
        </section>
      </div>
      <div className="lower-grid">
        <section className="panel recent-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent sales</h2>
              <p>The latest from your store.</p>
            </div>
            <Link className="text-link" to="/orders">
              View all orders <FiArrowUpRight />
            </Link>
          </div>
          <div className="sales-table-wrap">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 5).map((sale, index) => (
                  <tr key={`${sale.created_at}-${index}`}>
                    <td>
                      <div className="sale-product">
                        <span className="product-thumbnail">
                          {sale.category?.toLowerCase() === "watches" ? (
                            <FiClockIcon />
                          ) : (
                            <FiShoppingBag />
                          )}
                        </span>
                        <span>
                          <strong>{sale.name}</strong>
                          <small>
                            {sale.category}
                            {sale.size ? ` · ${sale.size}` : ""}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="customer-cell">#{sale.user_id}</span>
                    </td>
                    <td>
                      {sale.qty} <span className="muted">units</span>
                    </td>
                    <td>
                      {sale.created_at
                        ? new Date(
                            sale.created_at.replace(" ", "T"),
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!sales.length && (
              <div className="table-empty">
                <FiBox size={24} />
                <strong>
                  {loading
                    ? "Loading recent sales…"
                    : "Room for your next order"}
                </strong>
                <p>Recent sales will appear here when they’re available.</p>
              </div>
            )}
          </div>
        </section>
        <section className="panel top-products-panel">
          <div className="panel-heading">
            <div>
              <h2>Best sellers</h2>
              <p>The pieces your customers love.</p>
            </div>
            <FiArrowUpRight className="muted" />
          </div>
          {top.length ? (
            <div className="best-sellers">
              {top.slice(0, 4).map((product, index) => (
                <div className="best-seller" key={`${product.name}-${index}`}>
                  <span className="seller-rank">0{index + 1}</span>
                  <span className="seller-info">
                    <strong>{product.name}</strong>
                    <small>{product.category}</small>
                    <span className="seller-track">
                      <i
                        style={{
                          width: `${Math.max(5, (Number(product.qty) / Math.max(...top.map((item) => Number(item.qty)), 1)) * 100)}%`,
                        }}
                      />
                    </span>
                  </span>
                  <strong className="seller-qty">
                    {number(Number(product.qty))}
                    <small>sold</small>
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-empty">
              <FiShoppingBag size={24} />
              <strong>
                {loading
                  ? "Finding your favorites…"
                  : "The next favorite is out there"}
              </strong>
              <p>Your top selling products will appear here.</p>
            </div>
          )}
        </section>
      </div>
      <section className="quick-actions">
        <div>
          <span className="quick-icon">✳</span>
          <div>
            <h3>Keep your store moving.</h3>
            <p>Small updates. Big possibilities.</p>
          </div>
        </div>
        <div className="quick-links">
          <Link to="/addnew/clothes">
            <FiPlus />
            New product <FiChevronRight />
          </Link>
          <Link to="/history/instock">
            <FiArrowDownLeft />
            Stock history <FiChevronRight />
          </Link>
          <Link to="/orders">
            <FiBox />
            Manage orders <FiChevronRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
function FiClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M9 7V2h6v5M9 17v5h6v-5" />
      <circle cx="12" cy="12" r="6" />
      <path d="M12 9v3l2 1" />
    </svg>
  );
}
