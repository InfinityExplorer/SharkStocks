import axios, { AxiosError, AxiosResponse } from "axios";
import { CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyIncomeStatement, CompanyBalanceSheet } from "./company";

export interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string): Promise<AxiosResponse<SearchResponse, any> | string> => {
    try {
        return await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/stable/search-name?query=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message;
        }
        throw error;
    }
};


export const getCompanyProfile = async (query: string): Promise<CompanyProfile> => {
    try {
        const response = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/stable/profile?symbol=${encodeURIComponent(query)}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        
        if (!response.data || response.data.length === 0) {
            throw new Error("Компания не найдена");
        }
        console.log(response.data);
        return response.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
        }
        throw new Error("Unexpected error occurred");
    }
};

export const getKeyMetrics = async (query: string): Promise<CompanyKeyMetrics> => {
    try {
        const response = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${encodeURIComponent(query)}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        
        if (!response.data || response.data.length === 0) {
            throw new Error("Компания не найдена");
        }
        console.log(response.data);
        return response.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
        }
        throw new Error("Unexpected error occurred");
    }
};

export const getIncomeStatement = async (query: string): Promise<CompanyIncomeStatement[]> => {
    try {
        const response = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/stable/income-statement?symbol=${encodeURIComponent(query)}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        
        if (!response.data || response.data.length === 0) {
            throw new Error("Компания не найдена");
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
        }
        throw new Error("Unexpected error occurred");
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${encodeURIComponent(query)}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};