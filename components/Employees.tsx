import React from 'react';
import { initialEmployees } from '../constants';

const Employees: React.FC = () => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Daftar Karyawan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {initialEmployees.map(employee => (
                    <div key={employee.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <img 
                            src={employee.avatarUrl} 
                            alt={employee.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-200"
                        />
                        <h4 className="text-lg font-bold text-gray-900">{employee.name}</h4>
                        <p className="text-primary-600 font-medium">{employee.position}</p>
                        <p className="text-sm text-gray-500 mb-2">{employee.department}</p>
                        <div className="border-t pt-3 mt-3">
                           <a href={`mailto:${employee.email}`} className="text-sm text-blue-500 hover:underline">{employee.email}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;