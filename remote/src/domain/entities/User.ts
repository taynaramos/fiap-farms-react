export type UserRole = 'admin' | 'membro';

export class User {
  constructor(
    public id: string,
    public email: string,
    public displayName: string,
    public role: UserRole,
    public createdAt: Date
  ) {}

  static fromFirestore(data: any, id: string): User {
    return new User(
      id,
      data.email,
      data.displayName,
      data.role as UserRole,
      data.createdAt ? data.createdAt.toDate() : new Date()
    );
  }

  toFirestore() {
    return {
      email: this.email,
      displayName: this.displayName,
      role: this.role,
      createdAt: this.createdAt
    };
  }
} 