"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import {auth0} from "@/lib/auth0";

export default async function LoginPage() {
    // const session = await auth0.getSession();
    // const user = session?.user;


    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <Card className="w-[360px] rounded-2xl shadow-lg">
                    <CardContent className="space-y-6 p-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold">Admin Login</h1>
                            <p className="text-sm text-muted-foreground">
                                Sign in securely using Auth0
                            </p>
                        </div>

                        <Button size="lg" className="w-full" asChild>
                            <a href="/api/auth/login">
                                <LogIn className="mr-2 h-4 w-4" /> Continue with Auth0
                            </a>
                        </Button>

                        <p className="text-xs text-muted-foreground">
                            Protected by enterprise‑grade authentication
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
