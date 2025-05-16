import { StyleSheet } from 'react-native';

export const ticketStyles = StyleSheet.create({
  ticketItem: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eventInfo: {
    flex: 1,
    marginRight: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  ticketDate: {
    fontSize: 13,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  ticketDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  ticketDetails: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  ticketFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    padding: 12,
    alignItems: "center",
  },
  viewDetails: {
    fontSize: 14,
    color: "#21C064",
    fontWeight: "600",
  },
});

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxHeight: "90%",
    padding: 24,
    position: "relative",
  },
  closeModalButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
    padding: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#21C064",
    marginBottom: 16,
    paddingRight: 30,
  },
  ticketMetaContainer: {
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  ticketStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ticketStatusLabel: {
    fontSize: 15,
    color: "#666",
    marginRight: 8,
  },
  statusBadgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusTextLarge: {
    fontSize: 14,
    fontWeight: "600",
  },
  ticketDetailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  detailRowModal: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabelModal: {
    width: 80,
    fontSize: 15,
    color: "#666",
  },
  detailValueModal: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#21C064",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  eventNameContainer: {
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#21C064",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 24,
  },
  eventNameWarning: {
    fontSize: 13,
    color: "#E74C3C",
    marginTop: 4,
  },
  paymentButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const emptyStyles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 80,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    tintColor: "#ccc",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: "#21C064",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export const listStyles = StyleSheet.create({
  ticketList: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyList: {
    flexGrow: 1,
  },
}); 