import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Card from "./ui/Card";

const AuthTabs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de Login */}
          <Card padding="large">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Acceder</h2>
                <p className="mt-2 text-gray-600">
                  Ingresa a tu cuenta existente
                </p>
              </div>
              <LoginForm />
            </div>
          </Card>

          {/* Columna de Registro */}
          <Card padding="large">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Registrarse
                </h2>
                <p className="mt-2 text-gray-600">Crea una nueva cuenta</p>
              </div>
              <RegisterForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
