export interface TicketOrder {
  id: string;
  eventName: string;
  type: string;
  seat: string;
  orderDate: string;
  status: string;
  eventDate?: string;
  location?: string;
  price?: number;
  quantity?: number;
  [key: string]: any;
}

export interface TicketItemProps {
  item: TicketOrder;
  onPress: (ticket: TicketOrder) => void;
}

export interface TicketModalProps {
  visible: boolean;
  onClose: () => void;
  ticket: TicketOrder | null;
}

export interface EmptyTicketListProps {
  onBrowsePress: () => void;
}

export interface TicketListProps {
  tickets: TicketOrder[];
  onTicketPress: (ticket: TicketOrder) => void;
  refreshing: boolean;
  onRefresh: () => void;
  onBrowsePress: () => void;
} 