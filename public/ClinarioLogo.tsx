"use client";

import { useTheme } from "next-themes";
import type { SVGProps } from "react";
import { useEffect, useState } from "react";

export const ClinarioLogo = (props: SVGProps<SVGSVGElement>) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const fillColor = currentTheme === "dark" ? "#FFFFFF" : "#5755FF";

  return (
    <div className="flex items-center gap-x-2">
      <svg
        viewBox="0 0 2118 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M909.699 208.244H856.574C855.059 199.532 852.265 191.814 848.193 185.091C844.121 178.273 839.055 172.496 832.994 167.761C826.934 163.026 820.021 159.475 812.256 157.108C804.585 154.646 796.299 153.415 787.398 153.415C771.583 153.415 757.568 157.392 745.352 165.347C733.136 173.206 723.572 184.759 716.659 200.006C709.746 215.157 706.29 233.67 706.29 255.545C706.29 277.799 709.746 296.549 716.659 311.795C723.667 326.947 733.231 338.405 745.352 346.17C757.568 353.841 771.536 357.676 787.256 357.676C795.968 357.676 804.112 356.54 811.688 354.267C819.358 351.9 826.223 348.443 832.284 343.898C838.439 339.352 843.6 333.765 847.767 327.136C852.028 320.508 854.964 312.932 856.574 304.409L909.699 304.693C907.71 318.519 903.402 331.492 896.773 343.614C890.239 355.735 881.669 366.436 871.062 375.716C860.456 384.901 848.051 392.098 833.847 397.307C819.642 402.42 803.875 404.977 786.545 404.977C760.977 404.977 738.155 399.059 718.08 387.222C698.004 375.384 682.189 358.292 670.636 335.943C659.083 313.595 653.307 286.795 653.307 255.545C653.307 224.201 659.131 197.401 670.778 175.148C682.426 152.799 698.288 135.706 718.364 123.869C738.439 112.032 761.167 106.114 786.545 106.114C802.739 106.114 817.795 108.386 831.716 112.932C845.636 117.477 858.042 124.153 868.932 132.96C879.822 141.672 888.771 152.373 895.778 165.062C902.881 177.657 907.521 192.051 909.699 208.244ZM1007.11 110.091V401H955.686V110.091H1007.11ZM1059.98 401V182.818H1111.4V401H1059.98ZM1085.84 151.852C1077.69 151.852 1070.68 149.153 1064.81 143.756C1058.94 138.263 1056.01 131.682 1056.01 124.011C1056.01 116.246 1058.94 109.665 1064.81 104.267C1070.68 98.7745 1077.69 96.0283 1085.84 96.0283C1094.07 96.0283 1101.08 98.7745 1106.86 104.267C1112.73 109.665 1115.66 116.246 1115.66 124.011C1115.66 131.682 1112.73 138.263 1106.86 143.756C1101.08 149.153 1094.07 151.852 1085.84 151.852ZM1215.7 273.159V401H1164.28V182.818H1213.43V219.892H1215.98C1221 207.676 1229.01 197.97 1239.99 190.773C1251.07 183.576 1264.75 179.977 1281.04 179.977C1296.1 179.977 1309.21 183.197 1320.39 189.636C1331.66 196.076 1340.37 205.403 1346.52 217.619C1352.77 229.835 1355.85 244.655 1355.76 262.079V401H1304.34V270.034C1304.34 255.451 1300.55 244.04 1292.97 235.801C1285.49 227.562 1275.12 223.443 1261.87 223.443C1252.87 223.443 1244.87 225.432 1237.86 229.409C1230.95 233.292 1225.5 238.926 1221.52 246.312C1217.64 253.699 1215.7 262.648 1215.7 273.159ZM1470.81 405.403C1456.99 405.403 1444.54 402.941 1433.46 398.017C1422.47 392.998 1413.76 385.612 1407.32 375.858C1400.97 366.104 1397.8 354.078 1397.8 339.778C1397.8 327.468 1400.08 317.288 1404.62 309.239C1409.17 301.189 1415.37 294.75 1423.23 289.92C1431.09 285.091 1439.94 281.445 1449.79 278.983C1459.73 276.426 1470.01 274.579 1480.62 273.443C1493.4 272.117 1503.77 270.934 1511.72 269.892C1519.68 268.756 1525.45 267.051 1529.05 264.778C1532.75 262.411 1534.59 258.765 1534.59 253.841V252.989C1534.59 242.288 1531.42 234.002 1525.08 228.131C1518.73 222.259 1509.59 219.324 1497.66 219.324C1485.07 219.324 1475.08 222.07 1467.69 227.562C1460.4 233.055 1455.47 239.542 1452.92 247.023L1404.9 240.204C1408.69 226.947 1414.94 215.867 1423.65 206.966C1432.37 197.97 1443.02 191.246 1455.62 186.795C1468.21 182.25 1482.13 179.977 1497.38 179.977C1507.89 179.977 1518.35 181.208 1528.77 183.67C1539.19 186.133 1548.7 190.204 1557.32 195.886C1565.94 201.473 1572.85 209.097 1578.06 218.756C1583.36 228.415 1586.01 240.489 1586.01 254.977V401H1536.58V371.028H1534.88C1531.75 377.089 1527.35 382.771 1521.67 388.074C1516.08 393.282 1509.02 397.496 1500.5 400.716C1492.07 403.841 1482.18 405.403 1470.81 405.403ZM1484.17 367.619C1494.49 367.619 1503.44 365.583 1511.01 361.511C1518.59 357.345 1524.41 351.852 1528.48 345.034C1532.65 338.216 1534.73 330.782 1534.73 322.733V297.023C1533.12 298.348 1530.38 299.579 1526.5 300.716C1522.71 301.852 1518.45 302.847 1513.71 303.699C1508.98 304.551 1504.29 305.309 1499.65 305.972C1495.01 306.634 1490.98 307.203 1487.58 307.676C1479.9 308.718 1473.04 310.422 1466.98 312.79C1460.92 315.157 1456.14 318.472 1452.63 322.733C1449.13 326.9 1447.38 332.297 1447.38 338.926C1447.38 348.396 1450.83 355.545 1457.75 360.375C1464.66 365.204 1473.47 367.619 1484.17 367.619ZM1637.72 401V182.818H1687.58V219.182H1689.85C1693.83 206.587 1700.64 196.881 1710.3 190.062C1720.06 183.15 1731.18 179.693 1743.68 179.693C1746.52 179.693 1749.7 179.835 1753.2 180.119C1756.8 180.309 1759.78 180.64 1762.15 181.114V228.415C1759.97 227.657 1756.51 226.994 1751.78 226.426C1747.14 225.763 1742.64 225.432 1738.29 225.432C1728.91 225.432 1720.48 227.468 1713 231.54C1705.62 235.517 1699.79 241.057 1695.53 248.159C1691.27 255.261 1689.14 263.453 1689.14 272.733V401H1637.72ZM1796.31 401V182.818H1847.73V401H1796.31ZM1822.16 151.852C1814.02 151.852 1807.01 149.153 1801.14 143.756C1795.27 138.263 1792.33 131.682 1792.33 124.011C1792.33 116.246 1795.27 109.665 1801.14 104.267C1807.01 98.7745 1814.02 96.0283 1822.16 96.0283C1830.4 96.0283 1837.41 98.7745 1843.19 104.267C1849.06 109.665 1851.99 116.246 1851.99 124.011C1851.99 131.682 1849.06 138.263 1843.19 143.756C1837.41 149.153 1830.4 151.852 1822.16 151.852ZM1995.78 405.261C1974.47 405.261 1956.01 400.574 1940.38 391.199C1924.76 381.824 1912.63 368.708 1904.02 351.852C1895.49 334.996 1891.23 315.299 1891.23 292.761C1891.23 270.223 1895.49 250.479 1904.02 233.528C1912.63 216.578 1924.76 203.415 1940.38 194.04C1956.01 184.665 1974.47 179.977 1995.78 179.977C2017.09 179.977 2035.55 184.665 2051.18 194.04C2066.8 203.415 2078.88 216.578 2087.4 233.528C2096.02 250.479 2100.32 270.223 2100.32 292.761C2100.32 315.299 2096.02 334.996 2087.4 351.852C2078.88 368.708 2066.8 381.824 2051.18 391.199C2035.55 400.574 2017.09 405.261 1995.78 405.261ZM1996.06 364.068C2007.62 364.068 2017.27 360.896 2025.04 354.551C2032.8 348.112 2038.58 339.494 2042.37 328.699C2046.25 317.903 2048.19 305.877 2048.19 292.619C2048.19 279.267 2046.25 267.193 2042.37 256.398C2038.58 245.508 2032.8 236.843 2025.04 230.403C2017.27 223.964 2007.62 220.744 1996.06 220.744C1984.23 220.744 1974.38 223.964 1966.52 230.403C1958.75 236.843 1952.93 245.508 1949.05 256.398C1945.26 267.193 1943.36 279.267 1943.36 292.619C1943.36 305.877 1945.26 317.903 1949.05 328.699C1952.93 339.494 1958.75 348.112 1966.52 354.551C1974.38 360.896 1984.23 364.068 1996.06 364.068Z"
          fill={fillColor}
        />
        <rect
          y="512"
          width="512"
          height="512"
          rx="100"
          transform="rotate(-90 0 512)"
          fill="#5755FF"
        />
        <rect
          x="100"
          y="412"
          width="312"
          height="312"
          rx="50"
          transform="rotate(-90 100 412)"
          fill="white"
        />
        <circle
          cx="373"
          cy="373"
          r="109"
          transform="rotate(-90 373 373)"
          stroke="#5755FF"
          strokeWidth="60"
        />
        <circle
          cx="139"
          cy="139"
          r="109"
          transform="rotate(-90 139 139)"
          stroke="#5755FF"
          strokeWidth="60"
        />
      </svg>
      <span className="text-xl">| Blog</span>
    </div>
  );
};
