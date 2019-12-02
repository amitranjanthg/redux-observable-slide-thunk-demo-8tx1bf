import faker from 'faker';

let id = 1;

let allEvents = Array.apply(null, { length: 300 }).map(() => {
  return {
    id: id++,
    name: faker.company.companyName(),
    place: faker.address.streetAddress(),
    date: faker.date.future()
  };
});

export function fetchEvents({ query = '', offset = 0, limit = 50 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fetchedEvents = allEvents
        .slice(offset, offset + limit)
        .filter(e => !query || e.name.indexOf(query) !== -1);
      resolve(fetchedEvents);
    }, 1000)
  });
}

export function addEvent({ name, place, date = new Date().toString() }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = {
        id: id++,
        name,
        place,
        date
      };
      allEvents.unshift(event);
      resolve(event);
    }, 1000);
  })
}

export function removeEvent(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      allEvents = allEvents.filter(e => e.id !== id);
      resolve();
    }, 1000);
  })
}

export function removeAllEvents() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      allEvents = [];
      resolve();
    }, 1000);
  })
}