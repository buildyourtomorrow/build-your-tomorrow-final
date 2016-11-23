export class BYTBillFormModel {
  constructor(
  	public id: number,
    public date: Date,
    public category: string,
    public subCategory: string,
    public amount: number
  ) {  }
}