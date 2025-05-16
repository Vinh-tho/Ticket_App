import { API_URL } from '@/constants/api';
import axios from 'axios';

// Interface định nghĩa Event từ backend
export interface Event {
  id: number;
  eventName: string;
  mainImageUrl: string;
  eventDetail: {
    id: number;
    date: string;
    location: string;
    description: string;
    price: number;
  };
}

// Interface cho kết quả hiển thị tìm kiếm
export interface SearchEventResult {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  price: string;
}

// Interface cho xu hướng tìm kiếm
export interface TrendingSearch {
  id: string;
  name: string;
  type: 'event' | 'location';
  searchCount: number;
}

// Chuyển đổi từ Event của backend sang định dạng hiển thị
const formatEventForDisplay = (event: Event): SearchEventResult => {
  return {
    id: event.id.toString(),
    name: event.eventName,
    date: event.eventDetail?.date || 'Chưa có ngày',
    location: event.eventDetail?.location || 'Chưa có địa điểm',
    image: event.mainImageUrl || 'https://via.placeholder.com/300x150',
    price: event.eventDetail?.price ? `${event.eventDetail.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ',
  };
};

// Hàm lấy tất cả event
export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

// Hàm tìm kiếm event
export async function searchEvents(query: string): Promise<SearchEventResult[]> {
  try {
    // Lấy tất cả event từ backend
    const allEvents = await getAllEvents();
    
    // Nếu không có query, trả về mảng rỗng
    if (!query || !query.trim()) return [];
    
    // Filter các event phù hợp với query
    const queryLower = query.toLowerCase();
    const filteredEvents = allEvents.filter(event => 
      event.eventName.toLowerCase().includes(queryLower) || 
      event.eventDetail?.location?.toLowerCase().includes(queryLower) ||
      event.eventDetail?.description?.toLowerCase().includes(queryLower)
    );
    
    // Chuyển đổi sang định dạng hiển thị
    return filteredEvents.map(formatEventForDisplay);
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
}

// Hàm lấy xu hướng tìm kiếm phổ biến
export async function getTrendingSearches(): Promise<TrendingSearch[]> {
  try {
    // Trong thực tế, sẽ gọi API để lấy dữ liệu
    // const response = await axios.get(`${API_URL}/trending-searches`);
    // return response.data;
    
    // Sử dụng mock data trước khi có API thực tế
    const allEvents = await getAllEvents();
    
    // Lọc ra các sự kiện có dữ liệu đầy đủ
    const validEvents = allEvents.filter(event => event.eventName && event.eventDetail?.location);
    
    // Chuyển đổi dữ liệu sự kiện thành xu hướng tìm kiếm
    // Lấy 3 sự kiện làm xu hướng tên sự kiện
    const eventTrends = validEvents.slice(0, 3).map(event => ({
      id: event.id.toString(),
      name: event.eventName,
      type: 'event' as const,
      searchCount: Math.floor(Math.random() * 3000) + 1000, // Giả lập số lượt tìm kiếm
    }));
    
    // Lấy 2 địa điểm làm xu hướng địa điểm
    const uniqueLocations = Array.from(
      new Set(validEvents.map(event => event.eventDetail?.location).filter(Boolean))
    );
    
    const locationTrends = uniqueLocations.slice(0, 2).map((location, index) => ({
      id: `loc-${index}`,
      name: location as string,
      type: 'location' as const,
      searchCount: Math.floor(Math.random() * 2000) + 500, // Giả lập số lượt tìm kiếm
    }));
    
    // Kết hợp và sắp xếp theo số lượt tìm kiếm
    return [...eventTrends, ...locationTrends]
      .sort((a, b) => b.searchCount - a.searchCount);
  } catch (error) {
    console.error('Error fetching trending searches:', error);
    return []; // Trả về mảng rỗng trong trường hợp lỗi
  }
} 