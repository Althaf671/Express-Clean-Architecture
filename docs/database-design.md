# Database design

```ts
table Roles {
    id: string
    name: string
}

table User {
    id: string;
    name: string;
    email: string; // unique
    profileImage: jsonb;
    isBlacklisted: bool;
    isDeleted: bool; // partial delete
    deletedAt: datetime?;
    updatedAt: datetime?;
    createdAt: datetime;
    roleId: string;
}

table Competition {
    id: string;
    name: string; 
    theme: string;
    description: text;
    totalPrize: decimal;
    contentImage: jsonb;
    guideUrl: string;
    registrationUrl: string;
    requirement: string[];
    contactPerson: string[];
    isEligible: bool;
    registrationStartAt: datetime;
    registrationEndAt: datetime;
    isDeleted: bool; // partial delete
    isBookmarked: bool;
    deletedAt: datetime?;
    updatedAt: datetime?;
    createdAt: datetime;
}

table Scholarship {
    id: string;
    name: string;
    description: text;
    totalPrize: decimal;
    contentImage: jsonb;
    guideUrl: string;
    registrationUrl: string;
    requirement: string[];
    contactPerson: string[];
    registrationStartAt: datetime;
    registrationEndAt: datetime;
    isEligible: bool;
    isDeleted: bool; // partial delete
    isBookmarked: bool;
    deletedAt: datetime?;
    updatedAt: datetime?;
    createdAt: datetime;
}

table CompetitionCategory {
    id: string;
    name: string; // unique
    isDeleted: bool; // partial delete
    deletedAt: datetime?; 
    updatedAt: datetime?;
    createdAt: datetime;
}

table ScholarshipCategory {
    id: string;
    name: string; // unique
    isDeleted: bool; // partial delete
    deletedAt: datetime?;
    updatedAt: datetime?;
    createdAt: datetime;
}
```