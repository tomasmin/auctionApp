export class Product {
  constructor(
    public name: string,
    public description: string,
    public username: string,
    public status: Status = Status.new,
    public isStarted: Boolean = false,
    public highestBid: number = 0,
    public bids: Bid[] = [],
    public startedTimestamp?: number,
    public endingTimestamp?: number,
    public timeLeft?: string,
    public _id?: string
  ) {}
}

export interface Bid {
  username: string;
  timestamp: number;
  amount: number;
}

export enum Status {
  new = 'New',
  active = 'Active',
  closed = 'Closed',
}
