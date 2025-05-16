import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { TicketListProps } from './types';
import { listStyles } from './styles';
import { TicketItem } from './TicketItem';
import { EmptyTicketList } from './EmptyTicketList';

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onTicketPress,
  refreshing,
  onRefresh,
  onBrowsePress
}) => {
  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TicketItem item={item} onPress={onTicketPress} />
      )}
      contentContainerStyle={tickets.length === 0 ? listStyles.emptyList : listStyles.ticketList}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#21C064"]}
          tintColor="#21C064"
        />
      }
      ListEmptyComponent={<EmptyTicketList onBrowsePress={onBrowsePress} />}
    />
  );
}; 