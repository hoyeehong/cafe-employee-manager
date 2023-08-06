// seed.js - Seed data insertion script

import { SchemaType, SchemaTypes } from "mongoose";
import db from "./db.js"
import Cafe from "./models/cafeModel.js"
import Employee from "./models/employeeModel.js"

const seedData = async () => {
  try {
    // Seed cafes
    const cafe1 = new Cafe({
      name: 'Cafe A',
      description: 'Sample cafe A description',
      location: 'Sample location A',
      id: 'C-1',
      employees: ['E-1', 'E-2']
    });
    await cafe1.save();

    const cafe2 = new Cafe({
      name: 'Cafe B',
      description: 'Sample cafe B description',
      location: 'Sample location B',
      id: 'C-2',
      employees: ['E-3']
    });
    await cafe2.save();

    // Seed employees
    const employee1 = new Employee({
      id: 'E-1',
      name: 'John Doe',
      email_address: 'john@example.com',
      phone_number: '91234567',
      gender: 'Male',
      start_date: new Date('2023-01-01'),
      cafe_name: cafe1.name,
      cafe: cafe1
      
    });
    await employee1.save();

    const employee2 = new Employee({
      id: 'E-2',
      name: 'Jane Smith',
      email_address: 'jane@example.com',
      phone_number: '81234567',
      gender: 'Female',
      start_date: new Date('2023-02-01'),
      cafe_name: cafe1.name,
      cafe: cafe1
    });
    await employee2.save();

    const employee3 = new Employee({
      id: 'E-3',
      name: 'Sam Smith',
      email_address: 'sam@example.com',
      phone_number: '41234567',
      gender: 'Male',
      start_date: new Date('2023-03-01'),
      cafe_name: cafe2.name,
      cafe: cafe2
    });
    await employee3.save();

    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting seed data:', error);
    process.exit(1);
  }
};

seedData();
