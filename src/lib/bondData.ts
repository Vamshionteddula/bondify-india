export interface Bond {
  id: string;
  issuer: string;
  couponRate: number;
  faceValue: number;
  currentPrice: number;
  yield: number;
  maturityDate: string;
  rating: string;
  liquidity: 'High' | 'Medium' | 'Low';
  volume24h: number;
  changePercent: number;
  sector: string;
  tokenized: boolean;
  minInvestment: number;
}

export interface Order {
  id: string;
  type: 'buy' | 'sell';
  bondId: string;
  quantity: number;
  price: number;
  timestamp: string;
  status: 'pending' | 'filled' | 'cancelled';
}

export const sampleBonds: Bond[] = [
  {
    id: 'HDFC-2027',
    issuer: 'HDFC Bank Ltd',
    couponRate: 8.25,
    faceValue: 1000000,
    currentPrice: 1020000,
    yield: 7.95,
    maturityDate: '2027-12-15',
    rating: 'AAA',
    liquidity: 'High',
    volume24h: 25000000,
    changePercent: 1.2,
    sector: 'Banking',
    tokenized: true,
    minInvestment: 10000
  },
  {
    id: 'RELI-2026',
    issuer: 'Reliance Industries',
    couponRate: 7.80,
    faceValue: 1000000,
    currentPrice: 998000,
    yield: 7.95,
    maturityDate: '2026-09-20',
    rating: 'AA+',
    liquidity: 'High',
    volume24h: 18500000,
    changePercent: -0.5,
    sector: 'Energy',
    tokenized: true,
    minInvestment: 5000
  },
  {
    id: 'TATA-2028',
    issuer: 'Tata Steel Ltd',
    couponRate: 9.10,
    faceValue: 1000000,
    currentPrice: 1035000,
    yield: 8.65,
    maturityDate: '2028-03-10',
    rating: 'AA',
    liquidity: 'Medium',
    volume24h: 8200000,
    changePercent: 2.1,
    sector: 'Steel',
    tokenized: false,
    minInvestment: 100000
  },
  {
    id: 'ICIC-2025',
    issuer: 'ICICI Bank Ltd',
    couponRate: 7.65,
    faceValue: 1000000,
    currentPrice: 1008000,
    yield: 7.45,
    maturityDate: '2025-11-30',
    rating: 'AAA',
    liquidity: 'High',
    volume24h: 32000000,
    changePercent: 0.8,
    sector: 'Banking',
    tokenized: true,
    minInvestment: 15000
  },
  {
    id: 'INFY-2029',
    issuer: 'Infosys Ltd',
    couponRate: 6.95,
    faceValue: 1000000,
    currentPrice: 985000,
    yield: 7.25,
    maturityDate: '2029-06-15',
    rating: 'AA+',
    liquidity: 'Medium',
    volume24h: 12500000,
    changePercent: -1.2,
    sector: 'Technology',
    tokenized: true,
    minInvestment: 25000
  },
  {
    id: 'MAHM-2027',
    issuer: 'Mahindra & Mahindra',
    couponRate: 8.75,
    faceValue: 1000000,
    currentPrice: 1045000,
    yield: 8.15,
    maturityDate: '2027-08-22',
    rating: 'AA',
    liquidity: 'Low',
    volume24h: 3500000,
    changePercent: 1.8,
    sector: 'Automotive',
    tokenized: false,
    minInvestment: 200000
  }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};