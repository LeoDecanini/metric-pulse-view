import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Palette,
  Globe,
  Database,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme/theme-provider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { 
    theme, 
    setTheme, 
    animations, 
    setAnimations, 
    highContrast, 
    setHighContrast, 
    contentDensity, 
    setContentDensity 
  } = useTheme();
  
  useEffect(() => {
    console.log("Theme:", theme);
    console.log("Animations:", animations);
    console.log("High Contrast:", highContrast);
    console.log("Content Density:", contentDensity);
  }, [theme, animations, highContrast, contentDensity]);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto pb-10",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Configuración</h1>
          </div>
        </header>
        
        <main className="p-6">
          <Tabs defaultValue="appearance" className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="md:w-64 flex-shrink-0">
                <CardContent className="p-0">
                  <TabsList className="flex flex-col h-auto bg-transparent w-full p-0">
                    <TabsTrigger 
                      value="appearance" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Apariencia
                    </TabsTrigger>
                    <TabsTrigger 
                      value="account" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Cuenta
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notificaciones
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Seguridad
                    </TabsTrigger>
                    <TabsTrigger 
                      value="integrations" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Integraciones
                    </TabsTrigger>
                    <TabsTrigger 
                      value="data" 
                      className="justify-start w-full rounded-none border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-3"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Datos
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
              
              <div className="flex-1">
                <TabsContent value="appearance" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Apariencia</CardTitle>
                      <CardDescription>
                        Personaliza la apariencia visual de la plataforma.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Tema</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Modo de color</p>
                              <p className="text-sm text-muted-foreground">
                                Elige entre modo claro, oscuro o sincronizado con tu sistema.
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ToggleGroup type="single" value={theme} onValueChange={(value) => {
                                if (value) setTheme(value as "light" | "dark" | "system");
                              }}>
                                <ToggleGroupItem value="light" aria-label="Light mode">
                                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="dark" aria-label="Dark mode">
                                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-4">
                          <div>
                            <p className="font-medium">Animaciones</p>
                            <p className="text-sm text-muted-foreground">
                              Habilitar animaciones de interfaz.
                            </p>
                          </div>
                          <Switch 
                            checked={animations} 
                            onCheckedChange={(checked) => {
                              console.log("Setting animations to:", checked);
                              setAnimations(checked);
                            }} 
                            id="animations-switch"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-4">
                          <div>
                            <p className="font-medium">Modo contraste alto</p>
                            <p className="text-sm text-muted-foreground">
                              Mejora la legibilidad con mayor contraste.
                            </p>
                          </div>
                          <Switch 
                            checked={highContrast} 
                            onCheckedChange={(checked) => {
                              console.log("Setting high contrast to:", checked);
                              setHighContrast(checked);
                            }}
                            id="contrast-switch"
                          />
                        </div>
                        
                        <div className="border-t pt-4 space-y-2">
                          <Label htmlFor="density">Densidad de contenido</Label>
                          <Select 
                            value={contentDensity} 
                            onValueChange={(value) => {
                              console.log("Setting content density to:", value);
                              setContentDensity(value as "compact" | "comfortable" | "spacious");
                            }}
                          >
                            <SelectTrigger id="density" className="w-full md:w-52">
                              <SelectValue placeholder="Selecciona la densidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="compact">Compacta</SelectItem>
                              <SelectItem value="comfortable">Confortable</SelectItem>
                              <SelectItem value="spacious">Espaciosa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="account" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cuenta</CardTitle>
                      <CardDescription>
                        Administra tu perfil y preferencias de cuenta.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        La configuración de cuenta se mostrará aquí.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notificaciones</CardTitle>
                      <CardDescription>
                        Configura tus preferencias de notificaciones.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Las opciones de notificaciones se mostrarán aquí.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Seguridad</CardTitle>
                      <CardDescription>
                        Configuración de seguridad y acceso a tu cuenta.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        La configuración de seguridad se mostrará aquí.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integraciones</CardTitle>
                      <CardDescription>
                        Conecta con servicios externos y plataformas.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Las integraciones disponibles se mostrarán aquí.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="data" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Datos</CardTitle>
                      <CardDescription>
                        Gestiona tus datos y configuración de privacidad.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        La configuración de datos se mostrará aquí.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
