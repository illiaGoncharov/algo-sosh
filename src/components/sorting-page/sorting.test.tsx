import { selectionSort, bubbleSort } from "./sorting-page-algorithm";

describe("sorting", () => {
  describe("empty array", () => {
    it("selection sort (ascending)", () => {
      expect(selectionSort('ascend', [])).toEqual([]);
    });
    it("selection sort (descending)", () => {
      expect(selectionSort('descend', [])).toEqual([]);
    });
    it("bubble sort (ascending)", () => {
      expect(bubbleSort('ascend', [])).toEqual([]);
    });
    it("bubble sort (descending)", () => {
      expect(bubbleSort('descend', [])).toEqual([]);
    });
  });
  describe("one element", () => {
    it("selection one sort (ascending)", () => {
      expect(selectionSort('ascend', [1])).toEqual([1]);
    });
    it("selection one sort (descending)", () => {
      expect(selectionSort('descend', [1])).toEqual([1]);
    });
    it("bubble one sort (ascending)", () => {
      expect(bubbleSort('ascend', [1])).toEqual([1]);
    });
    it("bubble one sort (descending)", () => {
      expect(bubbleSort('descend', [1])).toEqual([1]);
    });
  });
  describe("multiple elements", () => {
    it("selection multiple sort (ascending)", () => {
      expect(selectionSort('ascend', [4, 2, 5, 1, 3, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it("selection multiple sort (descending)", () => {
      expect(selectionSort('descend', [4, 2, 5, 1, 3, 6])).toEqual([6, 5, 4, 3, 2, 1]);
    });
    it("bubble multiple sort (ascending)", () => {
      expect(bubbleSort('ascend', [4, 2, 5, 1, 3, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it("bubble multiple sort (descending)", () => {
      expect(bubbleSort('descend', [4, 2, 5, 1, 3, 6])).toEqual([6, 5, 4, 3, 2, 1]);
    });
  });
});