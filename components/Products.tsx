import React from 'react';
import { initialProducts } from '../constants';

const Products: React.FC = () => {
    const formatCurrency = (value: number) => value === 0 ? '-' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Daftar Produk & Jasa</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nama Produk/Jasa</th>
                            <th scope="col" className="px-6 py-3">Tipe</th>
                            <th scope="col" className="px-6 py-3 text-right">Harga Jual</th>
                            <th scope="col" className="px-6 py-3 text-right">Biaya</th>
                            <th scope="col" className="px-6 py-3 text-center">Stok Tersedia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialProducts.map(product => (
                            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4">{product.type}</td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(product.salePrice)}</td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(product.cost)}</td>
                                <td className={`px-6 py-4 text-center font-semibold ${product.type === 'Storable' && product.quantityOnHand < 50 ? 'text-red-500' : 'text-gray-800'}`}>
                                    {product.type === 'Storable' ? product.quantityOnHand : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;