db.waitlist.remove({});

const issuesDB = [
  {
    id: 1, name: 'Amy', phoneNumber: '123',
    date: new Date('2019-01-15'), 
  },
  {
    id: 2, name: 'Bob', phoneNumber: '456',
    date: new Date('2019-02-15'), 
  },
];

db.waitlist.insertMany(issuesDB);
const count = db.waitlist.count();
print('Inserted', count, 'waitlist');

db.counters.remove({ _id: 'waitlist' });
db.counters.insert({ _id: 'waitlist', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ name: 1 });
db.issues.createIndex({ phoneNumber: 1 });
db.issues.createIndex({ date: 1 });