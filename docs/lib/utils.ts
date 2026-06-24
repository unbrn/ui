/**
 * Returns true if the item was added within the last 5 days.
 * Used to show "NEW" badges on components/backgrounds in the catalog and sidebar.
 */
export function isItemNew(addedAtString: string): boolean {
  const addedDate = new Date(addedAtString);
  const diffMs = Date.now() - addedDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 5;
}
