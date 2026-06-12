'use client'

import { Category } from "@/app/lib/types";

interface SolvedCategoriesProps {
    categories: Category[];
}

export default function SolvedCategories({ categories }: SolvedCategoriesProps) {
    const variants = [
        'border-blue-400 shadow-blue-400/10 text-blue-400',
        'border-green-400 shadow-green-400/10 text-green-400',
        'border-orange-400 shadow-orange-400/10 text-orange-400',
        'border-violet-500 shadow-violet-400/10 text-violet-500'
    ];
    
    if (categories.length === 0) return null;
    
    return (
        <div className="flex flex-col gap-3 w-full transition-all duration-500">
            {categories.map((category, index) => (
                <div key={index} className={`flex flex-col rounded-2xl p-2 shadow-lg border ${variants[index]} transition-all delay-500`}>
                    <h5 className="text-center font-semibold">
                        {category.name}
                    </h5>
                    <div className="flex w-full justify-center text-onSurface">
                        {category.words.map((word, i) => (
                        <p className="px-1" key={i}>
                            {word.text} {i < 3 ? '،': ''}
                        </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}