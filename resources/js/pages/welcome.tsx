import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    const colors = {
        dark_blue: '#00033D',
        lighter_blue: '#0033FF',
        light_purple: '#977DFF',
        grey: '#EAEDF8',
        white: '#FFFFFF',
        black: '#030812'
    };

    return (
        <>
        </>
    );
}