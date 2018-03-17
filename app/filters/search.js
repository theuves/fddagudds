"use strict";

search.$inject = [
  "filterTags",
  "isNumber"
];

function search(
  filterTags,
  isNumber
) {
  return (data, start1, end1, start2, end2, tags) => {
    data = filterTags(data, tags);

    const hasMainFilter = isNumber(start1) && isNumber(end1) && start1 <= end1;
    const hasAdditionalFilter = isNumber(start2) && isNumber(end2) && start2 <= end2;

    if (hasMainFilter) {
      return data.filter(doc => {
        const processo = doc.processo;
        const number = processo.replace(/^.*>(\d+)<.*$/, "$1");
        const condition1 = start1 <= number && end1 >= number;
        const condition2 = start2 <= number && end2 >= number;

        return hasAdditionalFilter
          ? condition1 || condition2
          : condition1;
      });
    } else {
      return data;
    }
  };
}

export default search;